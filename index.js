/**
 * tohtml: an easy html writer
 * method 1, includes class only: element [class] text: button [btn btn-info] button1
 * method 2, includes mutiple tags: element {tags object string} text:  button {"class":"btn btn-danger", "style":"font-size:large;", "onclick":"save()"} save
 * img [class] src: img /images/test.jpg [img-float-right360 border-dark]
 * a [class] href text: a [btn btn-danger] /index.html Home
 * 
 * with child element
 * div/ [col-12 col-md-6]
 * h1  title 1 
 * h2  title 2
 * /div  
 * 
 * with multiple line inner text
 * h1/ [text-dark] 
 * // first line text in h1
 * // 2nd line text in h1
 * /h1
 * 
 * @param {String} content 
 */
module.exports = function (content) {
    var rows = content.split('\n') // 分行
    var html = ''
    for (var r of rows) {

        r = r.replace(/^ +/, '') //去除頭space
        var element = r.split(' ')[0]//
        var eClass = ''
        var tag = ''

        if (element.length > 0) {

            //檢查有無 class參數
            if (r.indexOf(' [') > -1 && r.match(/^[a-zA-Z0-9/]*? \[/)) {
                eClass = r.match(/\[.*?\]/)[0].replace(/\[|\]|\./g, "")
            }

            //檢查有無 Tag 參數
            if (r.indexOf(' {') > -1 && r.match(/^[a-zA-Z0-9/]*? \{/)) {

                var tagObj = JSON.parse(r.match(/\{.*?\}/)[0])
                for (var i in Object.keys(tagObj)) {
                    var key = Object.keys(tagObj)[i]
                    var value = Object.values(tagObj)[i]
                    if (key === "class") {
                        value = value.replace(/\./g, "")
                    }
                    tag += `${key}="${value}" `
                }

            }

            if (element.substring(0, 1) !== '/') { //非/開頭 
                html += `<${element.replace('/', '')}${eClass === '' ? '' : ` class="${eClass}"`} ${tag}`
            }

            if (r.match(/^[a-zA-Z0-9]+?\//)) { //  例div/ 
                var text = ''
                if (r.indexOf("]") > -1 || r.indexOf("}") > -1) {
                    text = r.replace(/.*?[\]\}] */, '')
                } else if (r.indexOf(' ') > -1) {
                    text = r.replace(/.*?\/ */, '')
                }
                html += `>${text}
                    `
            }
            else if (element.substring(0, 1) === '/') {  //  例/div, // 換行
                if (element.substring(1, 2) === '/') {
                    html += r.replace(/\/\/ */, '')
                } else {
                    html += `<${element}>
                    `
                }
            } else {

                if (element === 'img') {
                    var src = r.replace(/.*?[\]\}] */, '')
                    html += `src="${src}" />
                    `

                } else if (element === 'a') {
                    var href = r.replace(/.*?[\]\}] /, '').split(' ')[0]
                    var text = r.replace(/.*?[\]\}] /, '').split(' ')[1]
                    html += `href="${href}" >${text}</${element}>
                    `

                } else {
                    var text = ''
                    if (r.indexOf(']') > -1 || r.indexOf("}") > -1) {
                        text = r.replace(/.*?[\]\}] /, '')
                    } else if (r.indexOf(' ') > -1) {

                        text = r.replace(/.*? /, '')
                    }
                    html += `>
                    ${text}
                    </${element}>
                    `
                }
            }

        }


    }
    return html

}