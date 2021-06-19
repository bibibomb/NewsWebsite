var express = require('express');
var app = express()
var router = express.Router();
var bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
const axios = require('axios').default


const keyNy="1KNXluBCGoWXMiNvCsAJPcAxlp4iuCc6"
const keyGuardian="f326be57-5871-4e4b-a7f8-3caf1247da8d"

function filterResultNy(result,expectedNum,articleNum) {
    let arr = [], i = 0
    while (i < articleNum) {
        let obj = {}
        if (result[i].hasOwnProperty("title")){
            if (result[i].title !== null && result[i].title !== "" && result[i].title !== undefined) {
                obj.title = result[i].title
            } else {
                i++
                continue
            }
        } else {
            i++
            continue
        }
        if (result[i].hasOwnProperty("section")){
            if (result[i].section !== null && result[i].section !== "" && result[i].section !== undefined) {
                obj.type = result[i].section
            } else {
                i++
                continue
            }
        }else {
            i++
            continue
        }
        if (result[i].hasOwnProperty("published_date")){
            if (result[i].published_date !== null && result[i].published_date !== "" && result[i].published_date !== undefined) {
                obj.date = result[i].published_date.slice(0,10)
            } else {
                i++
                continue
            }
        }else {
            i++
            continue
        }
        if (result[i].hasOwnProperty("abstract")){
            if (result[i].abstract !== null && result[i].abstract !== "" && result[i].abstract !== undefined) {
                obj.description = result[i].abstract
            } else {
                i++
                continue
            }
        } else {
            i++
            continue
        }
        if (result[i].hasOwnProperty("multimedia")) {
            let multimedia = result[i].multimedia
            if (multimedia !== null && multimedia !== "" && multimedia !== undefined) {
                let src = ""
                if (multimedia.length !== 0) {
                    for (let i = 0; i < multimedia.length; i++) {
                        if (multimedia[i].width >= 2000) {
                            src = multimedia[i].url
                            break;
                        }
                    }
                }
                src = (src == "") ? "https://upload.wikimedia.org/wikipedia/commons/0/0e/Nytimes_hq.jpg" : src
                obj.image = src
            } else {
                i++
                continue
            }
        } else {
            i++
            continue
        }
        if (result[i].hasOwnProperty("uri")){
            if (result[i].uri !== null && result[i].uri !== "" && result[i].uri !== undefined) {
                obj.id = result[i].uri
            } else {
                i++
                continue
            }
        } else {
            i++
            continue
        }
        if (result[i].hasOwnProperty("url")){
            if (result[i].url !== null && result[i].url !== "" && result[i].url !== undefined) {
                obj.url = result[i].url
            } else {
                i++
                continue
            }
        } else {
            i++
            continue
        }
        arr.push(obj)
        i++
        if (arr.length === expectedNum) break
    }
    return arr
}
function filterResultGu(result,expectedNum,articleNum) {
    let arr = [], i = 0
    while (i < articleNum) {
        let obj = {}
        if (result[i].hasOwnProperty("webTitle")){
            if (result[i].webTitle !== null && result[i].webTitle !== "" && result[i].webTitle !== undefined) {
                obj.title = result[i].webTitle
            } else {
                i++
                continue
            }
        } else {
            i++
            continue
        }
        if (result[i].hasOwnProperty("sectionId")){
            if (result[i].sectionId !== null && result[i].sectionId !== "" && result[i].sectionId !== undefined) {
                obj.type = result[i].sectionId
            } else {
                i++
                continue
            }
        }else {
            i++
            continue
        }
        if (result[i].hasOwnProperty("webPublicationDate")){
            if (result[i].webPublicationDate !== null && result[i].webPublicationDate !== "" &&
                result[i].webPublicationDate !== undefined) {
                obj.date = result[i].webPublicationDate.slice(0,10)
            } else {
                i++
                continue
            }
        }else {
            i++
            continue
        }
        
        if (result[i].hasOwnProperty("id")){
            if (result[i].id !== null && result[i].id !== "" && result[i].id !== undefined) {
                obj.id = result[i].id
            } else {
                i++
                continue
            }
        } else {
            i++
            continue
        }
        
        if (result[i].hasOwnProperty("webUrl")){
            if (result[i].webUrl !== null && result[i].webUrl !== "" && result[i].webUrl !== undefined) {
                obj.url = result[i].webUrl
            } else {
                i++
                continue
            }
        } else {
            i++
            continue
        }
        
        if (result[i].hasOwnProperty("blocks")){
            if (result[i].blocks !== null && result[i].blocks !== "" && result[i].blocks !== undefined) {
                let block = result[i].blocks
                if (block.hasOwnProperty("body")) {
                    if (block.body.length !== 0 && block.body !== null && block.body !== "" && block.body !== undefined){
                        if (block.body[0].hasOwnProperty("bodyTextSummary")){
                            if (block.body[0].bodyTextSummary !== null && block.body[0].bodyTextSummary !== ""
                                && block.body[0].bodyTextSummary !== undefined){
                                obj.description = block.body[0].bodyTextSummary
                            } else {
                                i++
                                continue
                            }
                        } else {
                            i++
                            continue
                        }
                    } else {
                        i++
                        continue
                    }
                } else {
                    i++
                    continue
                }
                if (block.hasOwnProperty("main")) {
                    if (block.main !== null && block.main !== "" && block.main !== undefined){
                        if (block.main.hasOwnProperty("elements")){
                            if (block.main.elements.length !== 0 && block.main.elements !== null &&
                                block.main.elements !== "" && block.main.elements !== undefined){
                                let ele = block.main.elements[0]
                                if (ele.hasOwnProperty("assets")){
                                    if (ele.assets !== null && ele.assets !== ""
                                        && ele.assets !== undefined && ele.assets.length !== 0){
                                        let asset = ele.assets
                                        if (asset[asset.length-1].hasOwnProperty("file")) {
                                            let src = (asset[asset.length - 1].file !== "" ||
                                                asset[asset.length - 1].file !== null ||
                                                asset[asset.length - 1].file !== undefined) ?
                                                asset[asset.length - 1].file :
                                                "https://assets.guim.co.uk/images/eada8aa27c12fe2d5afa3a89d3fbae0d/fallback-logo.png"
                                            obj.image = src
                                        } else {
                                            i++
                                            continue
                                        }
                                    } else {
                                        i++
                                        continue
                                    }
                                } else {
                                    i++
                                    continue
                                }
                            } else {
                                i++
                                continue
                            }
                        } else {
                            i++
                            continue
                        }
                    } else {
                        i++
                        continue
                    }
                } else {
                    i++
                    continue
                }
            } else {
                i++
                continue
            }
        } else {
            i++
            continue
        }
        arr.push(obj)
        i++
        if (arr.length === expectedNum) break
    }
    return arr
}


// get search results
router.get('/news', function(req, res, next) {
    let query = req.query.q
    // console.log(query)
    let urlNy = "https://api.nytimes.com/svc/search/v2/articlesearch.json?q="
        + query + '&api-key=' + keyNy
    let urlGuardian = "https://content.guardianapis.com/search?q="
        + query + '&api-key=' + keyGuardian + '&show-blocks=all&page-size=30'
    const requestN = axios.get(urlNy)
    const requestG = axios.get(urlGuardian)
    axios.all([requestN,requestG]).then(axios.spread((...response) =>{
        const resultN = response[0].data.response.docs
        const resultG = response[1].data.response.results
        let arrN = filterResultNy(resultN,10,resultN.length)
        let arrG = filterResultGu(resultG,10,resultG.length)
        let arrTotal =[]
        if (arrN.length < 5 ) {
            if (arrG.length < 5) {
                arrTotal = arrG.concat(arrN)
            } else {
                arrTotal = arrN.concat(arrG.slice(0,11-arrN.length))
            }
        } else {
            if (arrG.length < 5) {
                if (arrN.length === 5) {
                    arrTotal = arrG.concat(arrN)
                } else {
                    arrTotal = arrG.concat(arrN.slice(0,11-arrG.length))
                }
            } else {
                arrTotal = arrN.slice(0,6).concat(arrG.slice(0,6))
            }
        }
        res.send(arrTotal)
    }))
});

module.exports = router
