var express = require('express');
var router = express.Router();
const axios = require('axios').default
const key = "f326be57-5871-4e4b-a7f8-3caf1247da8d"
const baseURL = "https://content.guardianapis.com"
// const baseURL = "http://localhost:3000"

function filterResult(result,expectedNum,articleNum) {
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
function filterImage(block) {
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
                                return src
                            }
                        }
                    }
                }
            }
        }
    }
    return "https://assets.guim.co.uk/images/eada8aa27c12fe2d5afa3a89d3fbae0d/fallback-logo.png"
}


/* GET home page. */
router.get('/', function(req, res, next) {
  axios.get(baseURL + '/search?api-key=' + key + '&section=(sport|business|technology|politics)&show-blocks=all' +
      '&page-size=30')
      .then(function (response) {
         let result = response.data.response.results
         let arr = filterResult(result, 10,30)
         res.send(arr)
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .then(function () {
        // always executed
      });
});

// get specific article
router.get('/article', function(req, res, next) {
    let id = req.query.id
    axios.get(baseURL + '/' + id + '?api-key=' + key + '&show-blocks=all')
        .then(function (response) {
            let result = response.data.response.content
            let obj = {}
            obj.img = filterImage(result.blocks)
            obj.date = result.webPublicationDate.slice(0,10)
            obj.title = result.webTitle
            obj.description = result.blocks.body[0].bodyTextSummary
            obj.url = result.webUrl
            obj.section = result.sectionId.toUpperCase()
            res.send(obj)
        })
});

// get section-based page
router.get('/:section', function(req, res, next) {
    let section = req.params.section
    console.log(section)
    if (section === "sports") section = "sport"
    axios.get(baseURL + '/' + section + '?api-key=' + key + '&show-blocks=all&page-size=30')
        .then(function (response) {
            let result = response.data.response.results
            let arr = filterResult(result,10,30)
            res.send(arr)
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
})

module.exports = router;
