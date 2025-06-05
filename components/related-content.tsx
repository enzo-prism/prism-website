import Link from "next/link"
import Image from "next/image"

type RelatedItem = {
  title: string
  description: string
  image: string
  url: string
  type: "blog" | "case-study" | "service"
}

export default function RelatedContent({ items, title = "Related Content" }: { items: RelatedItem[]; title?: string }) {
  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold mb-8 lowercase">{title}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item, index) => (
            <Link
              href={item.url}
              key={index}
              className="group block bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200"
            >
              <div className="relative h-48 w-full">
                <Image src={item.image || "/placeholder.svg"} alt={item.title} fill className="object-cover" />
              </div>
              <div className="p-4">
                <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {item.type === "blog" ? "Blog Post" : item.type === "case-study" ? "Case Study" : "Service"}
                </span>
                <h3 className="mt-2 text-lg font-medium text-gray-900 group-hover:text-blue-600 transition-colors duration-200 lowercase">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm text-gray-600 line-clamp-2">{item.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
