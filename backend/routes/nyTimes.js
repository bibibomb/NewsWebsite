var express = require('express');
var app = express()
var router = express.Router();
var bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
const axios = require('axios').default

const key="1KNXluBCGoWXMiNvCsAJPcAxlp4iuCc6"
const baseURL = "https://api.nytimes.com/svc/topstories/v2"
// const baseURL = "http://localhost:3000"


function filterResult(result,expectedNum,articleNum) {
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

// get home page
router.get('/', function(req, res, next) {
    console.log("run here")
    axios.get(baseURL + '/home.json?api-key=' + key)
        .then(function (response) {
            let result = response.data.results
            // console.log(response.data)
            let arr = filterResult(result,10,response.data.num_results)
            res.send(arr)
            // res.send(response.data)
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
    let url = req.query.id
    axios.get('https://api.nytimes.com/svc/search/v2/articlesearch.json?fq=web_url:("' + url + '")&api-key=' + key)
        .then(function (response) {
            let result = response.data.response.docs[0]
            let obj = {}
            let img = ""
            if (result.multimedia.length !== 0){
                for (let i=0;i<result.multimedia.length;i++){
                    if (result.multimedia[i].width >= 2000) {
                        img = result.multimedia[i].url
                        break;
                    }
                }
            }
            img = (img == "")? "https://upload.wikimedia.org/wikipedia/commons/0/0e/Nytimes_hq.jpg":
                "https://www.nytimes.com/" + img
            obj.img = img
            obj.date = result.pub_date.slice(0,10)
            obj.title = result.headline.main
            obj.description = result.abstract
            obj.url = result.web_url
            obj.section = result.section_name.toUpperCase()
            res.send(obj)
        })
});

// get section-based page
router.get('/:section', function(req, res, next) {
    let section = req.params.section
    axios.get(baseURL + '/' + section + '.json?api-key=' + key)
        .then(function (response) {
            let result = response.data.results
            let arr = filterResult(result,10,response.data.num_results)
            res.send(arr)
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
})

module.exports = router;
