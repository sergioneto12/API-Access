//Todos os pacotes instalados pelo programa.

const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require("body-parser");
const ejs = require('ejs');
const cors = require("cors");

//Chamando os métodos express (para as requisições), ejs (para usar os templates).

const app = express();

app.set('view engine', 'ejs');

// Nos métodos use, temos a separação do corpo do objeto, o uso da pasta public para salvar os arquivos de fora, cors, para permitir acesso de outros clientes.

app.use(cors());
app.use(bodyParser.urlencoded({
    extended:false
}));
app.use(bodyParser.json());

/* app.use(express.urlencoded({ extended: true }));
app.use(express.json()); */

app.use(express.static('public'));

//Conectando ao Mongoose - A conexão criada é de um localhost padrão, mas pode ser modificada, usando até o Mongo Atlas.

mongoose.connect('mongodb://localhost:27017/wikiDB', {useNewUrlParser: true, useUnifiedTopology: true});

//Criando um novo padrão de dados (Aqui é a chave do REST).

const articleSchema = {
    title: String,
    content: String
};

//Article é o modelo do mongoose que será lido ao se comunicar com o banco de dados.

const Article = mongoose.model("Article", articleSchema);

//Rotas para o uso dos artigos em geral, sem adentrar a um específico.

app.route('/articles')

.get((req, res) => {
    Article.find(function(err, foundArticles) {
        if (!err) {
            res.send(foundArticles);
        } else {
            res.send(err);
        }
    });
})

.post((req, res) => {
    console.log(req.body.title);
    console.log(req.body.content);

    const newArticle = new Article ({
        title: req.body.title,
        content: req.body.content
    });

    newArticle.save(function(err) {
        if(!err) {
            res.send("sucessfully Added");
        } else {
            res.send(err);
        }
    });
})

.delete((req, res) => {
    Article.deleteMany(
        function(err) {
            if (!err) {
                res.send('Sucessfully Removed');
            } else {
                res.send(err);
            };
        }
    );
});

//Chamando as rotas para artigos específicos.

app.route('/articles/:articleTitle')

.get((req, res) => {

    Article.findOne({title: req.params.articleTitle}, 
        function(err, foundArticle) {
            if (foundArticle) {
                res.send(foundArticle);
            } else {
                res.send("Not a match into our database");
            }
        }
    );
})

.put((req, res) => {
    Article.updateOne(
        {title: req.params.articleTitle},
        {$set: {title: req.body.title, content: req.body.content}},
        {overwrite: true},
        
        function(err) {
            if (!err) {
                res.send("Sucessfully Done");
            } else {
                res.send(err);
            }
        }
    );
})

.patch((req, res) => {
    Article.updateOne(
        {title: req.params.articleTitle},
        
        {$set: req.body},
        function(err) {
            if (!err) {
                res.send("Sucessfully Done");
            } else {
                res.send(err);
            }
        }
    );
})

.delete((req, res) => {
    Article.deleteOne(
        {title: req.params.articleTitle}, 
        function(err) {
            if (!err) {
                res.send('Sucessfully Removed');
            } else {
                res.send(err);
            };
        }
    )
});

app.listen(5000, () => {
    console.log('Tá tinindo no 5000');
});


