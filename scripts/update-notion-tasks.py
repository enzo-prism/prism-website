#!/usr/bin/env python3
"""
Script to update Notion tasks with due dates.
Updates all tasks in the "not started" column that don't have due dates.
"""

import requests
import json
from datetime import datetime, timedelta
from typing import Dict, List, Optional

# Notion API configuration
NOTION_TOKEN = "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"
NOTION_VERSION = "2022-06-28"
HEADERS = {
    "Authorization": f"Bearer {NOTION_TOKEN}",
    "Notion-Version": NOTION_VERSION,
    "Content-Type": "application/json"
}

# API endpoints
SEARCH_URL = "https://api.notion.com/v1/search"
DATABASE_QUERY_URL = "https://api.notion.com/v1/databases/{database_id}/query"
PAGE_UPDATE_URL = "https://api.notion.com/v1/pages/{page_id}"


def search_for_page(page_title: str) -> Optional[Dict]:
    """Search for a page by title."""
    payload = {
        "query": page_title,
        "sort": {
            "direction": "ascending",
            "timestamp": "last_edited_time"
        }
    }
    
    response = requests.post(SEARCH_URL, headers=HEADERS, json=payload)
    
    if response.status_code == 200:
        results = response.json()
        if results["results"]:
            # Look for exact match first
            for result in results["results"]:
                # Check title in different possible locations
                title = ""
                if result.get("properties", {}).get("title", {}).get("title"):
                    title = result["properties"]["title"]["title"][0].get("plain_text", "")
                elif result.get("properties", {}).get("Name", {}).get("title"):
                    title = result["properties"]["Name"]["title"][0].get("plain_text", "")
                
                if title.lower() == page_title.lower():
                    return result
            
            # Look for database with matching title
            for result in results["results"]:
                if result.get("object") == "database":
                    if page_title.lower() in result.get("title", [{}])[0].get("plain_text", "").lower():
                        return result
            
            # Return first result if no exact match
            return results["results"][0]
    else:
        print(f"Error searching for page: {response.status_code}")
        print(response.json())
    
    return None


def get_page_children(page_id: str) -> List[Dict]:
    """Get child blocks of a page to find databases."""
    url = f"https://api.notion.com/v1/blocks/{page_id}/children"
    
    all_children = []
    has_more = True
    start_cursor = None
    
    while has_more:
        params = {}
        if start_cursor:
            params["start_cursor"] = start_cursor
            
        response = requests.get(url, headers=HEADERS, params=params)
        
        if response.status_code == 200:
            data = response.json()
            all_children.extend(data.get("results", []))
            has_more = data.get("has_more", False)
            start_cursor = data.get("next_cursor", None)
        else:
            print(f"Error getting page children: {response.status_code}")
            print(response.json())
            break
    
    return all_children


def get_database_schema(database_id: str) -> Dict:
    """Get database schema to understand properties."""
    url = f"https://api.notion.com/v1/databases/{database_id}"
    response = requests.get(url, headers=HEADERS)
    
    if response.status_code == 200:
        return response.json()
    else:
        print(f"Error getting database schema: {response.status_code}")
        print(response.json())
        return {}


def query_database_tasks(database_id: str) -> List[Dict]:
    """Query database for tasks in 'not started' status without due dates."""
    url = DATABASE_QUERY_URL.format(database_id=database_id)
    
    # Build filter for tasks in "not started" status without due dates
    payload = {
        "filter": {
            "and": [
                {
                    "property": "Status",
                    "status": {
                        "equals": "Not started"
                    }
                },
                {
                    "property": "Due Date",  # Note: capitalized based on schema
                    "date": {
                        "is_empty": True
                    }
                }
            ]
        }
    }
    
    all_results = []
    has_more = True
    start_cursor = None
    
    while has_more:
        if start_cursor:
            payload["start_cursor"] = start_cursor
            
        response = requests.post(url, headers=HEADERS, json=payload)
        
        if response.status_code == 200:
            data = response.json()
            all_results.extend(data.get("results", []))
            has_more = data.get("has_more", False)
            start_cursor = data.get("next_cursor", None)
        else:
            print(f"Error querying database: {response.status_code}")
            print(response.json())
            break
    
    return all_results


def calculate_due_date(task: Dict) -> str:
    """Calculate due date based on task priority."""
    today = datetime.now()
    
    # Try to get priority from properties
    priority = None
    properties = task.get("properties", {})
    
    # Check for Priority property
    if "Priority" in properties:
        priority_prop = properties["Priority"]
        if priority_prop["type"] == "select" and priority_prop.get("select"):
            priority = priority_prop["select"]["name"].lower()
    
    # Set due date based on priority
    if priority == "high":
        due_date = today + timedelta(days=7)  # 1 week
    elif priority == "medium":
        due_date = today + timedelta(days=14)  # 2 weeks
    elif priority == "low":
        due_date = today + timedelta(days=21)  # 3 weeks
    else:
        due_date = today + timedelta(days=14)  # Default: 2 weeks
    
    return due_date.strftime("%Y-%m-%d")


def update_task_due_date(page_id: str, due_date: str) -> bool:
    """Update a task's due date."""
    url = PAGE_UPDATE_URL.format(page_id=page_id)
    
    payload = {
        "properties": {
            "Due Date": {  # Note: capitalized based on schema
                "date": {
                    "start": due_date
                }
            }
        }
    }
    
    response = requests.patch(url, headers=HEADERS, json=payload)
    
    if response.status_code == 200:
        return True
    else:
        print(f"Error updating page {page_id}: {response.status_code}")
        print(response.json())
        return False


def main():
    """Main function to update Notion tasks."""
    print("Starting Notion tasks update...")
    
    # Step 1: Search for tasks.prism page
    print("\n1. Searching for 'tasks.prism' page...")
    page = search_for_page("tasks.prism")
    
    if not page:
        print("Could not find 'tasks.prism' page.")
        return
    
    print(f"Found {page.get('object', 'unknown')}: {page['id']}")
    
    database_id = None
    
    # Check if it's a database
    if page.get("object") == "database":
        database_id = page["id"]
    else:
        # It's a page, look for child databases
        print("Found a page. Looking for databases within the page...")
        children = get_page_children(page["id"])
        
        databases_found = []
        for child in children:
            if child.get("type") == "child_database":
                db_id = child.get("id")
                if db_id:
                    # Get database info
                    db_info = get_database_schema(db_id)
                    if db_info:
                        db_title = ""
                        if db_info.get("title"):
                            db_title = db_info["title"][0].get("plain_text", "Untitled")
                        databases_found.append((db_id, db_title))
                        print(f"  - Found database: {db_title} ({db_id})")
        
        if not databases_found:
            print("No databases found in the page.")
            return
        elif len(databases_found) == 1:
            database_id = databases_found[0][0]
            print(f"Using database: {databases_found[0][1]}")
        else:
            # Multiple databases found, use the first one or look for one with "task" in the name
            for db_id, db_title in databases_found:
                if "task" in db_title.lower():
                    database_id = db_id
                    print(f"Using database with 'task' in name: {db_title}")
                    break
            
            if not database_id:
                database_id = databases_found[0][0]
                print(f"Using first database found: {databases_found[0][1]}")
    
    # Step 2: Get database schema to understand properties
    print("\n2. Getting database schema...")
    schema = get_database_schema(database_id)
    
    if schema:
        print("Database properties:")
        for prop_name, prop_info in schema.get("properties", {}).items():
            print(f"  - {prop_name}: {prop_info['type']}")
    
    # Step 3: Query for tasks without due dates
    print("\n3. Querying for tasks in 'Not started' status without due dates...")
    tasks = query_database_tasks(database_id)
    
    print(f"Found {len(tasks)} tasks to update.")
    
    if not tasks:
        print("No tasks found that need updating.")
        return
    
    # Step 4: Update each task with a due date
    print("\n4. Updating tasks with due dates...")
    updated_count = 0
    
    for i, task in enumerate(tasks, 1):
        task_title = "Untitled"
        
        # Try to get task title
        if "Name" in task["properties"]:
            name_prop = task["properties"]["Name"]
            if name_prop["type"] == "title" and name_prop.get("title"):
                task_title = name_prop["title"][0].get("plain_text", "Untitled")
        elif "Task" in task["properties"]:
            task_prop = task["properties"]["Task"]
            if task_prop["type"] == "title" and task_prop.get("title"):
                task_title = task_prop["title"][0].get("plain_text", "Untitled")
        
        due_date = calculate_due_date(task)
        
        print(f"  [{i}/{len(tasks)}] Updating '{task_title}' with due date: {due_date}")
        
        if update_task_due_date(task["id"], due_date):
            updated_count += 1
        else:
            print(f"    Failed to update task.")
    
    # Step 5: Summary
    print(f"\n5. Summary:")
    print(f"  - Total tasks found: {len(tasks)}")
    print(f"  - Successfully updated: {updated_count}")
    print(f"  - Failed updates: {len(tasks) - updated_count}")
    
    print("\nDone!")


if __name__ == "__main__":
    main()