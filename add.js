epub文件解析 
async loadItem(item, parents = []) {
    if (!item) return null
    const { href, mediaType } = item

    const isScript = MIME.JS.test(item.mediaType)
    if (isScript && !this.allowScript) return null

    const parent = parents.at(-1)
    if (this.#cache.has(href)) return this.ref(href, parent)

    const shouldReplace =
        (isScript || [MIME.XHTML, MIME.HTML, MIME.CSS, MIME.SVG].includes(mediaType))
        // prevent circular references
        && parents.every(p => p !== href)
    if (shouldReplace) return this.loadReplaced(item, parents)
    return this.createURL(href, await this.loadBlob(href), mediaType, parent)
}