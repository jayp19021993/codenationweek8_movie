require("dotenv").config(); 
const {Sequelize, DataTypes, Op}= require("sequelize"); 

const connection = new Sequelize(process.env.DB_URI); 

const Movie= connection.define("Movie",{
    name:{
        type:DataTypes.STRING, 
        allowNull:false
    }, 

    Type:{
        type:DataTypes.STRING,
        allowNull:false
    },

    Actors:{
        type:DataTypes.INTEGER,
        allowNull:false
    }
},{
    indexed:[{unque: true, fields:["name"]}]
});

const main = async()=>{
    try{ 
        await connection.authenticate();
        await Movie.sync({alter:true});
    
        const bat_man = Movie.build({
            Name: "Batman Begins", 
            Type: "Superhero",
            Actors:"Christian Bale"
        });
        
        await bat_man.save();
    } 

    const results =await Movie.findAll({
        attributes:["name", "type"],
        where:{
            [Op.or]:[
                {name:"Batman Begins"},
                {type:"Superhero"}
            ]
        }
    });

    for(let movie of results){
        console.log(`Movie:${Movie.Name} ->${type}`);
    }

    console.log("Connection has been successfully established");
    catch(error){
        console.error("Unable to connect to the database:", error);
    }

    await connection.close();
    process.exit();
} 

main();