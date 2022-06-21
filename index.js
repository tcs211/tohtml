/**
 * 1. includes class only: element [class] text: button [btn btn-info] button1
 * 2. includes attributes: element [attributes] text:  button [class="btn btn-danger" style="font-size:large;" onclick="save()"] save
 * =>with child element
 * div/ [col-12 col-md-6]
 * h1  title 1 
 * h2  title 2
 * /div  
 * 
 * =>with multiple line inner text
 * h1/ [text-dark] 
 * // first line text in h1
 * // 2nd line text in h1
 * /h1
 * 
 * @param {String} content 
 */
module.exports = function (content) {
    var level = 0
    var rows = content.split('\n') // 分行
    var html = ''

    for (var r of rows) {
        var headtab = ''
        for (var i = 0; i < level; i++) {
            headtab += '\t' //行前面的space
        }

        r = r.replace(/^ +/, '') //去除頭space
        var element = r.split(' ')[0]//
        var attrib = ''

        if (element.length > 0) {

            //檢查有無參數
            if (r.indexOf(' [') > -1 && r.match(/^[a-zA-Z0-9/]*? \[.*?\]/)) {
                attrib = r.match(/\[.*?\]/)[0].replace(/\[|\]/g, "")

            }



            if (element.substring(0, 1) !== '/' && element.substring(0, 1) !== '<') { //非/, <開頭 


                html += `${headtab}<${element.replace('/', '')}${attrib.length > 0 && attrib.indexOf('=') < 0 ? ` class="${attrib.replace(/\./g, '')}"` : attrib.length > 0 ? ' ' + attrib : ''}`

            }

            if (r.match(/^[a-zA-Z0-9]+?\//)) { //  例div/ 
                var text = ''
                if (r.indexOf("]") > -1) {
                    text = r.replace(/.*?[\]] */, '')
                } else if (r.indexOf(' ') > -1) {
                    text = r.replace(/.*?\/ */, '')
                }
                html += `>${text}\n`
                level += 1
            }
            else if (element.substring(0, 1) === '/') {  //  例/div, // 換行
                if (element.substring(1, 2) === '/') { // 換行
                    html += headtab + r.replace(/\/\/ */, '') + '\n'
                } else {
                    html += `${headtab}<${element}>\n`
                    level -= 1
                }
            }
            else if (element.substring(0, 1) === '<') {  //  html 格式 pass

                html += headtab + r + '\n'

            }
            else {


                var text = ''
                if (r.indexOf(']') > -1) {
                    text = r.replace(/.*?\] */, '')
                } else if (r.indexOf(' ') > -1) {

                    text = r.replace(/.*? /, '')
                }
                html += `>${text}</${element}>\n`

            }

        }


    }
    return html

}