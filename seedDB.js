const Course = require("./models/course")
const User = require("./models/user")
const Review = require("./models/review")
const Field = require("./models/field")
const bcrypt = require('bcryptjs');
const mongoose = require("mongoose");

// mongodb url
const url = process.env.DATABASEURL || 'mongodb://localhost:27017/web-online-academy';
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

async function seedDB() {
    console.log("deleting collections documents...");
    await Course.deleteMany({});
    await User.deleteMany({});
    await Review.deleteMany({});
    await Field.deleteMany({});
    console.log("deleted collections documents.")
    console.log("creating collections documents...")


    const data = {
        "field": {
            "name": "web-development",
            "courses": []
        },
        "course": {
            "title": "The Web Developer Bootcamp 2020",
            "subtitle": "JUST COMPLETELY REDONE - The only course you need to learn web development - HTML, CSS, JS, Node, and More!",
            "descriptions": [],
            "reviews": [],
            "students": [],
            "image1xURL": "https://img-a.udemycdn.com/course/240x135/625204_436a_3.jpg",
            "image2xURL": "https://img-a.udemycdn.com/course/480x270/625204_436a_3.jpg",
            "image3xURL": "https://img-a.udemycdn.com/course/750x422/625204_436a_3.jpg",
            "discountPrice": 11.99,
            "originalPrice": 129.99,
            "numViews": 0,
            "curriculum": []
        },
        "reviews": [
            {
                "body": "Being a fresher as a web developer this course helped me not only to understand web coding in such a easy way but also made each section of the course interesting and enjoyable due to the awesome teaching method by 'Colt Steele'.\n\nBest course to start with as a beginner into Web Development!!!",
                "rating": 5
            },
            {
                "body": "Great course while studying computer science students during summer vacation and I enjoyed each part of the course. Whoever is having passion for web development must pursue this course for having better knowledge about front and back end development.",
                "rating": 5
            },
            {
                "body": "Very comprehensive overall. Can be a bit difficult to follow due to the speed the course progresses through all the content, but other than that, I cannot ask for more. Definitely going to check out the advanced course :D",
                "rating": 5
            },
            {
                "body": "good introduction course for web development. Course cover various of web dev essentials such as html, css, javascript, nodejs, api , routes etc. Great support from the TA.\n\nHowever, the course is rather outdated and lots of technology is no longer support / use nowadays such as bootstrap 3 and jQuery, Javascript ES 5 only . Also lots of coding in backend and the tools are also out of date. It makes the TA keeps updating materials, new videos as a supplement to cover those parts and its a bit messy.\n\nI enjoy the course as Colt is really good at teaching. But I personally would not recommend this course simply because the outdated content. It is a course 5 years ago and I end up need to subscribe different courses to supplement those parts.\n\nI hope Colt and the team will revisit my comment and consider to update most of the content in the course include ES6 Javascript syntax, backend sessions etc.",
                "rating": 4
            },
            {
                "body": "Not as good as expected. Some of the materials are old and you get a feeling you´ll have to update yourself. The course needs a revamp to make it a 2020 course.\n\nThere are a lot of intermediate comments made by Colt´s assistant Ian that try to help but reflect the fact the course needs to be reviewed. I know that is a lot of work, but that would get you 5 star reviews.\n\nOn the other hand I feel disappointed with the fact that in the end, I wasn´t thought how to create my own website. The deployment part speaks briefly about how to deploy a project in Heroku. Nothing is said about what about if I already have my own website. Or if I want to create a new one. I wanted to learn coding to improve my business website. I have it in wordpress. I'm aware the backend language is php and I can use a control panel to manage it. Nothing in the course is said about this.\n\nSome of the contents are disconnected. At some point you'll be sent to Ian's youtube videos, then comes Ellie to speak about javascript more advanced issues, not announced.\n\nI got to the end and the YelpCamp project that was core to our learning through experience was incomplete. They give you a number of videos from youtube to try and give you the essentials. I only watched one by Ian on google maps, and it was so old I couldn´t follow wit the current Google API environment.\n\nThe promise I was given when I bought the course wasn´t delivered. This is not enough for me to create my own website or project.\n\nAll this said I also need to leave some comments of the positives of this course. First of all the Q&A team. I've asked a couple of things and responses were quick and helpful. On online environment that is very welcome.\n\nThe course is thorough. I think I now have the tools to go deeper into the different technologies and languages if I want.\n\nColt is very clear in his expositions. Some times speaks to quick for a foreigner like myself, but we have the magic of rewind to hear as many times as we wish.\n\nWith all considered this is probably, still one of the best and more complete courses online available on the subject. I feel tempted to search for others though.\n\nThere are many other positive aspects I haven´t focused on. All in all I think 3 stars is the rate applicable at this point in time.\n\nColt and team, please think about updating the materials, or even creating a new whole course.",
                "rating": 3
            },
            {
                "body": "This was a great, comprehensive course to learn the basics of web development! Colt, has a engaging and informative teaching style that gives you a great foundation to go into more advanced topics. It kind of ends abruptly without much guidance on how to proceed, but Colt definitely gives all you need to figure it out. The sky is the limit after you take this course! Thanks Colt, Ian, Zarko, Louli, and Akshay for all your hardwork!",
                "rating": 4
            },
            {
                "body": "Frustrating is how I would best describe this course. In the beginning course is alright. It just gets incredibly frustrating towards the end where almost everything is outdated. The slides beforehand are always nice - where it mentions the updated syntax, but having to follow through those videos with outdated syntax where we learned the updated syntax many many slides ago is just frustrating, confusing, and just plain annoying. This course was probably great 5 years ago, but these videos need to be updated properly for it to be truly effective. The few slides many moons ago, don't do this course any justice, and the fact that there are often so many things left out of the videos truly leaves me demotivated to finish the course. I always return to finish, but I can see these frustrations leaving many not wanting code again. Decent course for the price, Colt is a pretty good teacher and I would love to learn from him at one of his other bootcamps, but the material is lacking in 2020.",
                "rating": 3
            },
            {
                "body": "Awesome course for all groups , covered almost everything related to WEB Developer ever needed to learn you have to put your effort first in this course there more than enough to learn !!",
                "rating": 4.5
            },
            {
                "body": "The course offers a lot of content! I expected this course to take me from a complete novice to a beginner level web developer and it has. The first half of the course that deals with frontend development is very comprehensive as Colt takes time to explain concepts.\n\nThe second half however left me a bit frustrated; the backend development felt more like bringing the puzzle pieces together rather than understanding the basic of puzzle. The course has given me a good idea of how node works, but I am unsatisfied with the approach taken: most of the time, when we included packages, it felt like we were doing so arbitrarily. On this front, there were too many minor things to take care of and remember; I am not sure if this is inherent to working with node, but it was left unclear.\n\nOverall, the course offers more than what I paid for it and I am happy with what I have learned from this course.\n\nThanks Colt!",
                "rating": 4
            },
            {
                "body": "Very good introducing me to new technologies in more modern web development. A good fit in general, but given my robust experience in previous statistical programming (and occasional web-app-widget creation) in R and Python I think an advanced course would have been slightly more appropriate.",
                "rating": 4
            },
            {
                "body": "I would give 10 stars if possible.\n\nOne of the best courses I did (and I've done plenty).\n\nThe instructions given by Colt are very clear, easy to follow along, and the YelpCamp project is really cool, as it gives us an objective to achieve by the end of the training (I am still working on it after finishing the training, to include more features and put in practice everything I've learned).\n\nAnother point that I really appreciated is that all external services (online database, image storage, deploy servers) are free and credit card information is not required.\n\nLastly, the course was entirely reviewed and updated (in 2020). I was literally in the middle of the old one when the update came, but I gladly went through all of it again.\n\nThank you very much Colt for this extrordinary experience.",
                "rating": 5
            },
            {
                "body": "Colt is a great instructor and the course is really complete. One downside, I read before starting it, in some forums, that it's out of date, which is true. BUT, Ian made a great job on keeping it up to date. He added a lot of value to it, not only in the course but also with extra material on his YouTube channel and DevSprout, his personal courses website.\n\nThanks Colt and Ian for creating an amazing course, keep up the great work!",
                "rating": 5
            }
        ],
        "students": [
            {
                "name": "Sunil Krishna Peddamalli",
                "email": "sunilkrishnapeddamalli@gmail.com",
                "password": "sunilkrishnapeddamalli",
                "role": "s"
            },
            {
                "name": "G.Naveen Kumar",
                "email": "g.naveenkumar@gmail.com",
                "password": "g.naveenkumar",
                "role": "s"
            },
            {
                "name": "Brendin Swanepoel",
                "email": "brendinswanepoel@gmail.com",
                "password": "brendinswanepoel",
                "role": "s"
            },
            {
                "name": "Derry Yuen",
                "email": "derryyuen@gmail.com",
                "password": "derryyuen",
                "role": "s"
            },
            {
                "name": "Alexandre Trindade",
                "email": "alexandretrindade@gmail.com",
                "password": "alexandretrindade",
                "role": "s"
            },
            {
                "name": "Jordan Aceves-Foster",
                "email": "jordanaceves-foster@gmail.com",
                "password": "jordanaceves-foster",
                "role": "s"
            },
            {
                "name": "Nigel M",
                "email": "nigelm@gmail.com",
                "password": "nigelm",
                "role": "s"
            },
            {
                "name": "Akhilesh Mankotia",
                "email": "akhileshmankotia@gmail.com",
                "password": "akhileshmankotia",
                "role": "s"
            },
            {
                "name": "Shahzaib Momin",
                "email": "shahzaibmomin@gmail.com",
                "password": "shahzaibmomin",
                "role": "s"
            },
            {
                "name": "Brent Zey",
                "email": "brentzey@gmail.com",
                "password": "brentzey",
                "role": "s"
            },
            {
                "name": "Renato Antunes",
                "email": "renatoantunes@gmail.com",
                "password": "renatoantunes",
                "role": "s"
            },
            {
                "name": "Francisco M",
                "email": "franciscom@gmail.com",
                "password": "franciscom",
                "role": "s"
            }
        ],
        "instructor": {
            "name": "Colt Steele",
            "email": "coltsteele@gmail.com",
            "password": "coltsteele",
            "role": "i"
        }
    }
    var field = await new Field(data.field).save();
    var course = await new Course(data.course).save();

    for (var i = 0; i < data.reviews.length; i++) {
        await new Review(data.reviews[i]).save();
    }
    var reviews = await Review.find({});

    for (var i = 0; i < data.students.length; i++) {
        await new User(data.students[i]).save();
    }
    var students = await User.find({});

    var instructor = await new User(data.instructor).save();

    console.log("created collections documents.");


    // setting relationships between collections
    field.courses.push(course);
    field = await field.save();

    course.field = field;
    course.instructor = instructor;
    course.reviews = reviews;
    // re-calculate the course's average rating 
    course.calculateAverageRating(() => { });
    course.students = students;
    course = await course.save();

    instructor.uploadedCourses.push(course);
    instructor = await instructor.save();

    for (var i = 0; i < students.length; i++) {
        students[i].enrolledCourses.push(course);
        await students[i].save();
    }

    students = await User.find({ role: "s" });

    for (var i = 0; i < reviews.length; i++) {
        reviews[i].author = students[i];
        await reviews[i].save();
    }
    reviews = await Review.find({});



}

seedDB();