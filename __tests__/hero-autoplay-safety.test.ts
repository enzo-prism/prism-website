import fs from 'node:fs'
import path from 'node:path'

type SourceFile = {
  absolutePath: string
  relativePath: string
}

const ROOT_DIR = path.resolve(__dirname, '..')
const SEARCH_DIRS = ['app', 'components']
const AUTOPLAY_REGEX = /\bautoPlay\b/

const APPROVED_FILES = new Set([
  'components/HeroBackgroundLoop.tsx',
  'components/HeroLoopingVideo.tsx',
  'components/ascii/AsciiMotionIcon.tsx',
])

const listSourceFiles = (dirPath: string): SourceFile[] => {
  const entries = fs.readdirSync(dirPath, { withFileTypes: true })
  return entries.flatMap((entry) => {
    const absolutePath = path.join(dirPath, entry.name)
    if (entry.isDirectory()) {
      return listSourceFiles(absolutePath)
    }

    if (!entry.isFile() || !entry.name.endsWith('.tsx')) {
      return []
    }

    const relativePath = path.relative(ROOT_DIR, absolutePath)
    return [{ absolutePath, relativePath }]
  })
}

describe('Decorative autoplay videos remain guarded', () => {
  it('only allows autoPlay in approved loop wrappers', () => {
    const filesWithAutoplay: string[] = SEARCH_DIRS.flatMap((directory) =>
      listSourceFiles(path.join(ROOT_DIR, directory))
        .filter((file) => file.relativePath.endsWith('.tsx'))
        .filter((file) => {
          const content = fs.readFileSync(file.absolutePath, 'utf8')
          return AUTOPLAY_REGEX.test(content)
        })
        .map((file) => file.relativePath.replace(/\\\\/g, '/')),
    )

    expect(filesWithAutoplay.every((file) => APPROVED_FILES.has(file))).toBe(
      true,
    )

    if (!filesWithAutoplay.every((file) => APPROVED_FILES.has(file))) {
      const unexpected = filesWithAutoplay.filter(
        (file) => !APPROVED_FILES.has(file),
      )
      throw new Error(
        `Unexpected autoPlay usage found in:\n${unexpected.join('\n')}\n` +
          'Add touch/device-gated wrappers for decorative loops before introducing new autoPlay videos.',
      )
    }
  })
})
