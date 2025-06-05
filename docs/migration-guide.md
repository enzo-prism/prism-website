# Image Component Migration Guide

## Replacing Old Components

Replace all instances of:
- `import OptimizedImage from "@/components/optimized-image"`
- `import CoreImage from "@/components/core-image"`
- `import EnhancedImage from "@/components/enhanced-image"`

With:
\`\`\`tsx
import Image from "@/components/image"
\`\`\`

The new unified Image component supports all the same props and functionality.
