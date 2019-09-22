const formidable = require("formidable");
const Image = require("mongoose").model("Image");

module.exports = (req, res) => {
    if (req.pathname === '/addImage' && req.method === 'POST') {
        addImage(req, res)
    } else if (req.pathname === '/delete' && req.method === 'GET') {
        deleteImg(req, res)
    } else {
        return true
    }
};

function addImage(req, res) {
    const form = new formidable.IncomingForm();

    form.parse(req, (err, fields, files) => {
        if (err) {
            throw err;
        }

        const tags = fields.tagsID.split(',').reduce((acc, val) => {
            if (acc.includes(val) || val.length === 0) {
                return acc;
            } else {
                acc.push(val);
                return acc;
            }
        }, []);

        const image = {
            url: fields.imageUrl,
            description: fields.description,
            tags
        };

        Image.create(image).then(image => {
            res.writeHead(302, {
                'location': '/'
            });
            res.end();
        }).catch(err => {
            res.writeHead(500, {
                'content-type':'text/plain'
            });
            res.write('500 Server Error');
            res.end();
        });
    });

}