const Course = require("./models/course")
const User = require("./models/user")
const Review = require("./models/review")
const Field = require("./models/field")

var students = [
    // student 0
    {
        name: "hiep 1",
        email: "hiep1@gmail.com",
        password: "hiep1",
        role: "s",
        wishList: [],
        enrolledCourses: [],
        uploadedCourses: []
    },
    // student 1
    {
        name: "hiep 2",
        email: "hiep2@gmail.com",
        password: "hiep2",
        role: "s",
        wishList: [],
        enrolledCourses: [],
        uploadedCourses: []
    },
    // student 2
    {
        name: "hiep 2",
        email: "hiep3@gmail.com",
        password: "hiep3",
        role: "s",
        wishList: [],
        enrolledCourses: [],
        uploadedCourses: []
    }

]

var instructors = [
    // instructor 0
    {
        name: "Colt Steele",
        email: "coltsteele@gmail.com",
        password: "coltsteele",
        role: "i",
        wishList: [],
        enrolledCourses: [],
        uploadedCourses: []
    },
    // instructor 1
    {
        name: "Jonas Schmedtmann",
        email: "jonasschmedtmann@gmail.com",
        password: "jonasschmedtmann",
        role: "i",
        wishList: [],
        enrolledCourses: [],
        uploadedCourses: []
    },
    // instructor 2
    {
        name: "Dr. Angela Yu",
        email: "dr.angelayu@gmail.com",
        password: "dr.angelayu",
        role: "i",
        wishList: [],
        enrolledCourses: [],
        uploadedCourses: []
    },
    // instructor 3
    {
        name: "Rob Percival",
        email: "robpercival@gmail.com",
        password: "robpercival",
        role: "i",
        wishList: [],
        enrolledCourses: [],
        uploadedCourses: []
    }
]


var courses = [
    {
        "title": "The Web Developer Bootcamp 2020",
        "subtitle": "JUST COMPLETELY REDONE - The only course you need to learn web development - HTML, CSS, JS, Node, and More!",
        "descriptions": [],
        "reviews": [],
        "rating": "4.7",
        "students": [],
        "image1xURL": "https://img-a.udemycdn.com/course/240x135/625204_436a_3.jpg?zhcgsIgkb7OMdNbTDhI6bTf60ivueqt5PBjj1JOkwlqa8xMDfvIIYVN8pW6kwa2VujGSP-wdAI2F2V3bFpHn-nMzy-ocdsdRWrYKDXYcxGGpmX49iivzEdhOJdR3O_A",
        "image2xURL": "https://img-a.udemycdn.com/course/480x270/625204_436a_3.jpg?BJLHxaX8lJzvpsM3arZisgLBHo9vueJTbzfBvY6Fqe8gnCtz9iWZfdW_FVINxDKajOcCYhxG8CfWbn9uNaOD_0c_SRp_lhdbEGe4tiX759naGp6PLgimtop73ps_SNg",
        "discountPrice": 11.99,
        "originalPrice": 129.99,
        "numViews": 0,
        "curriculum": []
    },
    {
        "title": "Angular - The Complete Guide (2020 Edition)",
        "subtitle": "Master Angular 10 (formerly \"Angular 2\") and build awesome, reactive web apps with the successor of Angular.js",
        "descriptions": [],
        "reviews": [],
        "rating": "4.6",
        "students": [],
        "image1xURL": "https://img-a.udemycdn.com/course/240x135/756150_c033_2.jpg?K2nOrlvYGseTKO8XmgXy_MBwpWni6AkolN-IzgRSPc-SBgQP7IjH2rwA2K33cMnJorKpj5S8YvYV0vbv_uN1kimdVM8Ki5Jqe3gvFuj9uwT6o4kXZezh5-pGdFEHSKE",
        "image2xURL": "https://img-a.udemycdn.com/course/480x270/756150_c033_2.jpg?BCMZBUfoJGWfyfrNYxy3ze2idKy1-nrOLgeYQC3XPA4OF4DEEiiDQLB2dpKE_8hrD0wVbPV_ZCkjidyGkkFc9kccPi5kzAHpAKtX3bg5ZhncQ37-hlkXU477jab-Zb4",
        "discountPrice": 11.99,
        "originalPrice": 129.99,
        "numViews": 0,
        "curriculum": []
    },
    {
        "title": "The Complete 2020 Web Development Bootcamp",
        "subtitle": "Become a full-stack web developer with just one course. HTML, CSS, Javascript, Node, React, MongoDB and more!",
        "descriptions": [],
        "reviews": [],
        "rating": "4.7",
        "students": [],
        "image1xURL": "https://img-a.udemycdn.com/course/240x135/1565838_e54e_11.jpg?wiK6IdeLPv4RsV59b_nEO-nJ6UuFvGkKuvZCkgfBoDrdU_UJ5U4e_PIaqJxqVAFghKopDaEQc7gJfHDMT1PeePlJmHbdc-efU3dk-WEU2ygh-jaWp5cF4vgd3YNvSTXX3w",
        "image2xURL": "https://img-b.udemycdn.com/course/480x270/1565838_e54e_11.jpg?secure=wRYfqfqep1KbkrH_KRsKnA%3D%3D%2C1607362638",
        "discountPrice": 11.99,
        "originalPrice": 129.99,
        "numViews": 0,
        "curriculum": []
    },
    {
        "title": "The Complete JavaScript Course 2020: From Zero to Expert!",
        "subtitle": "The modern JavaScript course for everyone! Master JavaScript with projects, challenges and theory. Many courses in one!",
        "descriptions": [],
        "reviews": [],
        "rating": "4.7",
        "students": [],
        "image1xURL": "https://img-b.udemycdn.com/course/240x135/851712_fc61_6.jpg?secure=vXAcfCXMeN_42AP81GsPYg%3D%3D%2C1607366490",
        "image2xURL": "https://img-a.udemycdn.com/course/480x270/851712_fc61_6.jpg?vSqEANnSR_9iFcERwbTHkwL2Xuvb766k7FsnA3uPKXyHeXTfpDebs4NC_D7x-6qiI3Z0SROig_jBNQUjxCFhb5QWLiIwoyV63bxxPCzGgsgMyVMscEs-o696e-_oWIw",
        "discountPrice": 11.99,
        "originalPrice": 129.99,
        "numViews": 0,
        "curriculum": []
    },
    {
        "title": "The Complete Web Developer Course 2.0",
        "subtitle": "Learn Web Development by building 25 websites and mobile apps using HTML, CSS, Javascript, PHP, Python, MySQL & more!",
        "descriptions": [],
        "reviews": [],
        "rating": "4.5",
        "students": [],
        "image1xURL": "https://img-a.udemycdn.com/course/240x135/764164_de03_2.jpg?ADFNR30o90WUQ0_eAZEVD1n-8OMy5Fgh9pmPPZDwaNxex88AhlEtqSxlLJIJNhpSc8qM61g3lpDeqd-XzJH57iuq3pyl7GvuyUVGjnLkAqX0W3fct5MwYv8Jo6bbdA0",
        "image2xURL": "https://img-a.udemycdn.com/course/480x270/764164_de03_2.jpg?YGR0eLos61KLpGrwZGWfT1U41tMY2LqA5vMCi67EZc5Wngm1f0uY1kpwppjroXNUXid7NiLSM05_fswU76uXXsvCQtooEghNe-h86-e3cyzxn0JxUVHUpRPUR92kxqc",
        "discountPrice": 11.99,
        "originalPrice": 129.99,
        "numViews": 0,
        "curriculum": []
    },
    {
        "title": "Modern React with Redux [2020 Update]",
        "subtitle": "Master React v16.6.3 and Redux with React Router, Webpack, and Create-React-App. Includes Hooks!",
        "descriptions": [],
        "reviews": [],
        "rating": "4.7",
        "students": [],
        "image1xURL": "https://img-a.udemycdn.com/course/240x135/705264_caa9_11.jpg?pDpGR71qfgyW_5CUQDcMJhiPWGL-XI-mS5XcQ7AUAvu6fmczbZh3RxPhuAN9WhyLgESEZ4n76eNExq8B25JZMxo37a_hu_SrDw_IM9U9p_0-hTM0wB9OjpQdKCw9m42O",
        "image2xURL": "https://img-a.udemycdn.com/course/480x270/705264_caa9_11.jpg?UT9mZN4LXtg5si08ChyS_2j7diNfTCrstiaKoR2St-trzdTnXmyvI5mNW5Ol1zBzqDzcgQgF327Rpt1Drt-nRKRL_luGQS5F8grOcCD0XgW5BnhiPtunGX7dBjJnqChf",
        "discountPrice": 11.99,
        "originalPrice": 129.99,
        "numViews": 0,
        "curriculum": []
    },
    {
        "title": "Build Responsive Real World Websites with HTML5 and CSS3",
        "subtitle": "The easiest way to learn modern web design, HTML5 and CSS3 step-by-step from scratch. Design AND code a huge project.",
        "descriptions": [],
        "reviews": [],
        "rating": "4.6",
        "students": [],
        "image1xURL": "https://img-a.udemycdn.com/course/240x135/437398_46c3_9.jpg?6ZZtFKzUzEy284r5WZzbS9BG3c9pCeCjTT1lAIzKeLjgogGpWA-ygzMPuiNASZhjK4mBUvV5mfS6lOmuQ1-KnhnH3ynZpJ_pf94YFmD1QqGc4BxKp0mCjw5IuSR9D5Y",
        "image2xURL": "https://img-b.udemycdn.com/course/480x270/437398_46c3_9.jpg?secure=k6NhrHNp9K0Xth3NrjxeJg%3D%3D%2C1607364938",
        "discountPrice": 12.99,
        "originalPrice": 139.99,
        "numViews": 0,
        "curriculum": []
    },
    {
        "title": "Vue - The Complete Guide (w/ Router, Vuex, Composition API)",
        "subtitle": "Vue.js is an awesome JavaScript Framework for building Frontend Applications! VueJS mixes the Best of Angular + React!",
        "descriptions": [],
        "reviews": [],
        "rating": "4.7",
        "students": [],
        "image1xURL": "https://img-a.udemycdn.com/course/240x135/995016_ebf4_2.jpg?I2NW9OxEtxcQtREF9h_w4tfxER4-sZ2SeYE1DRLd49CuU16SpHEkLRFY57Ie2M8MDGw6nw662OK-KawLFIB1dAerz-sEgQx5yIVNQNPis8Daf",
        "image2xURL": "Gbq01r64hmK3k 1x, https://img-a.udemycdn.com/course/480x270/995016_ebf4_2.jpg?mg1YoeTZjuhW7TFTScbOIr66wR4M6sxvF6-FVPUsjeguttmeqqoKm0rmpzYoW8qThbrvhR4_z130u3dElWHQZnwerK8uWpyHQmAK3QxV1Ex0hMQpq1eJCn7LjHuDxZs",
        "discountPrice": 11.99,
        "originalPrice": 129.99,
        "numViews": 0,
        "curriculum": []
    },
    {
        "title": "The Complete Web Developer in 2021: Zero to Mastery",
        "subtitle": "Learn to code and become a Web Developer in 2021 with HTML, CSS, Javascript, React, Node.js, Machine Learning & more!",
        "descriptions": [],
        "reviews": [],
        "rating": "4.7",
        "students": [],
        "image1xURL": "https://img-a.udemycdn.com/course/240x135/1430746_2f43_10.jpg?-AAvkLVeZ5NawgzVkjSp78wLem4izIn1FWQRhLe4CxpbtwQ8505vA2oPF0M-Fmlk5EOIC-Z8MhP0ORGmxFVt2t8i8oPnogsxGZXjHRhr8rzo3GdnRWpjFEO8KhrbPIfzvg",
        "image2xURL": "https://img-a.udemycdn.com/course/480x270/1430746_2f43_10.jpg?i36kuaRAEH1zm7HIhQ2C9Hr7nzdd_iRKwB5Ypa-2tjyhb4-Z1IHVQbjU7bkfjmOSGnFZVAit4tQWbL117j8h_77AJjDS1S9bDtoEtLu-pgmZMKtVsMtg2QMQmSL0QJmZEQ",
        "discountPrice": 11.99,
        "originalPrice": 129.99,
        "numViews": 0,
        "curriculum": []
    },
    {
        "title": "JavaScript: Understanding the Weird Parts",
        "subtitle": "An advanced JavaScript course for everyone! Scope, closures, prototypes, 'this', build your own framework, and more.",
        "descriptions": [],
        "reviews": [],
        "rating": "4.7",
        "students": [],
        "image1xURL": "https://img-a.udemycdn.com/course/240x135/364426_2991_5.jpg?r3V3e4N_rjdgVYSn52fzwIgC_-mp4_xTUDYhhd1i9pBiIb-82P9FEfj_Pwihmfwd9JoB58fA329BCRlA1hhZVrzN7gMei-BECj8ws7aUvmq9sJ8nln6k4bd20iSh94s",
        "image2xURL": "https://img-a.udemycdn.com/course/480x270/364426_2991_5.jpg?brOEhMTiiN_MblpqpO-ac5xR_NGaRPPj6XrSV-tip_Os3TALsecWMbju0QL6LN8aFbGhElx5pBsIle6sNOb0zHIfr1R5jSYIyM3HPR95QOtkvCpdbHROctuT6XGDf4c",
        "discountPrice": 11.99,
        "originalPrice": 129.99,
        "numViews": 0,
        "curriculum": []
    },
    {
        "title": "Python and Django Full Stack Web Developer Bootcamp",
        "subtitle": "Learn to build websites with HTML , CSS , Bootstrap , Javascript , jQuery , Python 3 , and Django!",
        "descriptions": [],
        "reviews": [],
        "rating": "4.5",
        "students": [],
        "image1xURL": "https://img-a.udemycdn.com/course/240x135/822444_a6db.jpg?da6bsq6OqdMIFZ8OcJkdAShZAmynYH45On2VfP2kqSXwoSQPWdGHVY5pf_6QlWJHrnyBbz3MDPz-83wG0zUkZNAVRvC4H-4kVpyKv1Q-6yWmXaq8G0gqw2SVnCyg",
        "image2xURL": "https://img-a.udemycdn.com/course/480x270/822444_a6db.jpg?sZ2ttmDsTGkxYe1JrUKfG5RjNvk9NNV853p7b7AEnSjtj5C-mumWEMrZVPRPtJXcIN15qZTEiHy1I7F7PZVervfhPtvjtfQWv01bt8memL_ZriPhYo3uPBRvKIDC",
        "discountPrice": 11.99,
        "originalPrice": 129.99,
        "numViews": 0,
        "curriculum": []
    },
    {
        "title": "Advanced CSS and Sass: Flexbox, Grid, Animations and More!",
        "subtitle": "The most advanced and modern CSS course on the internet: master flexbox, CSS Grid, responsive design, and so much more.",
        "descriptions": [],
        "reviews": [],
        "rating": "4.8",
        "students": [],
        "image1xURL": "https://img-a.udemycdn.com/course/240x135/1026604_790b_2.jpg?C4ks0qD1iEdgml8OEIkk-qWFXDz6masvYRdDQhksH34zGUvBdvULaWvwF43JLkZHyXMZDHQrfJTTIByh63ozQ1ZwL8MtMzw71jX8lk2Iqx6il0pjzDw9l79uIycRs3L2",
        "image2xURL": "https://img-a.udemycdn.com/course/480x270/1026604_790b_2.jpg?E9Dxl4QNlSEmGpV7nmgHdldkgxjCHBjdknQ0l5UC9H2IJLKSNGkRn1fUBtDIoVdyq1YuMe0DTT1jOH5HyOMYMzWqAtVR7tvSZg6_gRIGpdKrH5q5YtzMACdJGr1Lhths",
        "discountPrice": 11.99,
        "originalPrice": 129.99,
        "numViews": 0,
        "curriculum": []
    },
    {
        "title": "The Complete ASP.NET MVC 5 Course",
        "subtitle": "Learn to build fast and secure web applications with ASP.NET MVC 5 - The most popular course with 40,000+ students!",
        "descriptions": [],
        "reviews": [],
        "rating": "4.4",
        "students": [],
        "image1xURL": "https://img-a.udemycdn.com/course/240x135/806922_6310_3.jpg?k7ATVZ_x4oRaDpym3RGxB9Lv5A18wXCnicJFABp4wiM_6W2pf-Z5VMx58ICxEZBu7bk_5dVYhQS3I_baOwpsqOiSppni9_sIuQrwDb-xweC4CEbv82migtCHmPRw8es",
        "image2xURL": "https://img-b.udemycdn.com/course/480x270/806922_6310_3.jpg?secure=ns4RjHwoEgjxv4cJzpKpnw%3D%3D%2C1607390276",
        "discountPrice": 11.99,
        "originalPrice": 129.99,
        "numViews": 0,
        "curriculum": []
    },
    {
        "title": "Learn and Understand NodeJS",
        "subtitle": "Dive deep under the hood of NodeJS. Learn V8, Express, the MEAN stack, core Javascript concepts, and more.",
        "descriptions": [],
        "reviews": [],
        "rating": "4.6",
        "students": [],
        "image1xURL": "https://img-a.udemycdn.com/course/240x135/461160_8d87_6.jpg?P-6asvgxYNnS3wFalgf4W3caiNN_PPt3X3xI2GgXlj1uGBANvVgB2jXp_UoazCWdXSczRvhyHcYREcc4i6fD4akaFyZhFzWxMD5WjB-pccUfGUbXyqT5Gffi8Q7OGfY",
        "image2xURL": "https://img-a.udemycdn.com/course/480x270/461160_8d87_6.jpg?jbWD3HJNac0O76B5ndsVAWBy88IdM623Bri5qpqDXrZThUdk8jkmagGfs5C47UcrsdqS5GwfPAnxIMQMhrTwSFLljIcjQWoKq9zZoDvGzECfEqOU4e_iGZ5n0mv-OjY",
        "discountPrice": 11.99,
        "originalPrice": 129.99,
        "numViews": 0,
        "curriculum": []
    },
    {
        "title": "Master Microservices with Spring Boot and Spring Cloud",
        "subtitle": "An awesome journey from Restful Web Services ( REST API ) to Microservices with Java, Spring Boot and Spring Cloud",
        "descriptions": [],
        "reviews": [],
        "rating": "4.4",
        "students": [],
        "image1xURL": "https://img-a.udemycdn.com/course/240x135/1352468_3d97_7.jpg?HlBZRurKwtejCGwmfbpeIPkwF0Xuzllayab1sKGEa6Pt8Z-3kCHwTVVMaG3xauxtg2jNwq5LkWV1GKldxp-VEv8_o6QlzkoUdCO56dtJ02f9rD9wl4ti51lmzFbJLIdV",
        "image2xURL": "https://img-a.udemycdn.com/course/480x270/1352468_3d97_7.jpg?XQ_yfAx8DZeX6nBLs-OFpk5eGfwn2nCmw0aIrIQq9ppUCfYof2ARKGhmtzcA1Hq43Vo2b9q11NAt6Pbqdin0LAL660auzO8pBtYxzvyW4tf-eAMandOtCNc3MenhAixW",
        "discountPrice": 18.99,
        "originalPrice": 199.99,
        "numViews": 0,
        "curriculum": []
    },
    {
        "title": "Modern JavaScript From The Beginning",
        "subtitle": "Learn and build projects with pure JavaScript (No frameworks or libraries)",
        "descriptions": [],
        "reviews": [],
        "rating": "4.7",
        "students": [],
        "image1xURL": "https://img-a.udemycdn.com/course/240x135/1463348_52a4_2.jpg?K0Wbtq44hu2CiMSgDC1kvaCcV5LZyeuViuEFn2Ng1NGd_rAPzGygoZnJpL5FDUkcWH5yopAKpEzGVt4AOXOweCFVyTa6mSaFHklo_Q1kI7-mmt67r-SPnazY8y6n1LsA",
        "image2xURL": "https://img-a.udemycdn.com/course/480x270/1463348_52a4_2.jpg?e8zWi3Caj4gRYxZ7mIX2gmKn6HKkdsalOkE1Ze-F6Sg9ypPgworyZsVUReIt8DejuUCILFYBmsr-k3wUsVqGI3WNjK7GRJ73xDezQoVg4IXGdD-McpIE9seAUY1_dp1x",
        "discountPrice": 11.99,
        "originalPrice": 129.99,
        "numViews": 0,
        "curriculum": []
    },

    {
        "title": "iOS 13 & Swift 5 - The Complete iOS App Development Bootcamp",
        "subtitle": "From Beginner to iOS App Developer with Just One Course! Fully Updated with a Comprehensive Module Dedicated to SwiftUI!",
        "descriptions": [],
        "reviews": [],
        "rating": "4.8",
        "students": [],
        "image1xURL": "https://img-a.udemycdn.com/course/240x135/1778502_f4b9_11.jpg?20xIS4pQEcZY2FqHZNA6YeWWoSquUmmQkO6OMvCTvVtjL2LK8r-5FegKITQg9i4UEXTZfqozR_mqBdK1XO376jySP68hLt5Ij32i7mm__4I5GIo4YzRgdtBU9qcMDk-Gww",
        "image2xURL": "https://img-a.udemycdn.com/course/480x270/1778502_f4b9_11.jpg?i0RWtxHFvG6q69Ow4mBY7MKC8m3-VTqfAfA3mEvQc7S0GZk3QgfXnVxIwT0Cd2krUJFFTyut2nA0BOQtdbelsBX_NxSVomWKLSJGNHjpPJwhTubrlFX25dZrqIY8bxrVNg",
        "discountPrice": 11.99,
        "originalPrice": 129.99,
        "numViews": 0,
        "curriculum": []
    },
    {
        "title": "The Complete React Native + Hooks Course [2020 Edition]",
        "subtitle": "Understand React Native v0.62.2 with Hooks, Context, and React Navigation.",
        "descriptions": [],
        "reviews": [],
        "rating": "4.6",
        "students": [],
        "image1xURL": "https://img-a.udemycdn.com/course/240x135/959700_8bd2_11.jpg?7zSeWac5jmweYhHNPKrcJ6lwBl-zswlh5-79Qk0D4mBz4z7NGB6vFHM_en0sj6Ok_75tq6Qnr0eBjzAcZ29YQUHSKW9SvdU0tX8PgR2xJUQqctGsy8SuTiDVeH",
        "image2xURL": "I 1x, https://img-a.udemycdn.com/course/480x270/959700_8bd2_11.jpg?p9qXcjR24Fewc_xSeEgnyvPyh0d7uOL3I9YPE3xSbLVDw-n3hm2zYXGgztirWhYwp-ZmgTqhRznjXhPTfjgoC1RTvaIRNAZNQLZRQ8t1BNAvqPAMbN_s8FGIcOVkC9WR",
        "discountPrice": 18.99,
        "originalPrice": 94.99,
        "numViews": 0,
        "curriculum": []
    },
    {
        "title": "iOS 11 & Swift 4 - The Complete iOS App Development Bootcamp",
        "subtitle": "Learn iOS 11 App Development From Beginning to End. Using Xcode 9 and Swift 4. Includes Full ARKit and CoreML Modules!",
        "descriptions": [],
        "reviews": [],
        "rating": "4.6",
        "students": [],
        "image1xURL": "https://img-a.udemycdn.com/course/240x135/1289478_5831_9.jpg?FMozviGr9nIVTC0v3MRmBNKHs_HoqHhkePMvNQjnzOehUJQ1MHBDiQAGweOuUGzRYLSaAnajgOHx92KU6wwJi0ZVw_E0Sofq9xZJAeWLh2T-GQcDX-3Ymc0WRjDKQTNF",
        "image2xURL": "https://img-b.udemycdn.com/course/480x270/1289478_5831_9.jpg?secure=jsA4EZ7QVos452riyLGMDg%3D%3D%2C1607435273",
        "discountPrice": 11.99,
        "originalPrice": 129.99,
        "numViews": 0,
        "curriculum": []
    },
    {
        "title": "Flutter & Dart - The Complete Guide [2020 Edition]",
        "subtitle": "A Complete Guide to the Flutter SDK & Flutter Framework for building native iOS and Android apps",
        "descriptions": [],
        "reviews": [],
        "rating": "4.6",
        "students": [],
        "image1xURL": "https://img-b.udemycdn.com/course/240x135/1708340_7108_4.jpg?secure=pklg_CWfC3w1CGV2ju2tCQ%3D%3D%2C1607414507",
        "image2xURL": "https://img-a.udemycdn.com/course/480x270/1708340_7108_4.jpg?9yNiriikMcWMTwsgz4hPjjZoAvhLd00ru671RYFxl7IotyzC2PJ6IQGF7YlOaiEBCZ0Z65iyJhWCa4Wn7pfsPIrW6ZEYjI5RHuxsfOa6MfB8Q2PK_CN6KBb3NLFXoi73",
        "discountPrice": 11.99,
        "originalPrice": 129.99,
        "numViews": 0,
        "curriculum": []
    },
    {
        "title": "The Complete Android N Developer Course",
        "subtitle": "Learn Android App Development with Android 7 Nougat by building real apps including Uber, Whatsapp and Instagram!",
        "descriptions": [],
        "reviews": [],
        "rating": "4.4",
        "students": [],
        "image1xURL": "https://img-a.udemycdn.com/course/240x135/951618_0839_2.jpg?Q0Asz5WCbPac5X7aFLVMtAR-loq7vwHQvXxyk33RZFM3dS3eQJu23JgLhwvg8-U6bcooydpVArlzJ2nwSTCJi9ojTV8XT3sixMHyKblJ3i4M_eIZ9BoYJt9_j-Ng5WM",
        "image2xURL": "https://img-a.udemycdn.com/course/480x270/951618_0839_2.jpg?0ArfneF8iwdz9c-VFjd0zsq6hdDkFahuhXxVAIeMSChSGDisWk-RblxE-J0uPoEaYn-N1DAYErEDlEt4wo3kdOSq1yigorcFPF77JTNWyvWg-6ojVPRjlWjyBLI06mE",
        "discountPrice": 11.99,
        "originalPrice": 129.99,
        "numViews": 0,
        "curriculum": []
    },
    {
        "title": "The Complete 2020 Flutter Development Bootcamp with Dart",
        "subtitle": "Officially created in collaboration with the Google Flutter team.",
        "descriptions": [],
        "reviews": [],
        "rating": "4.7",
        "students": [],
        "image1xURL": "https://img-a.udemycdn.com/course/240x135/2259120_305f_6.jpg?MwwXCtGkID6wSMaYockXe04xBaY1in-zCAGGw4z74B_R0uJX76picirU4Q0gBiM20iz0DSzenCLTbnUiW83uCZ4_9hCi3K1i1XKNAfu-KLN4HD3c3FKMe8aMMMwITKNk",
        "image2xURL": "https://img-a.udemycdn.com/course/480x270/2259120_305f_6.jpg?Wa46471HaBmvHLtSQARg6Ck2Pr7122f4-GU5U3HtfQkBv0E8RW1FVGPFUnaYysQquHSXdhLarjLtJ_jMjmAx630Vbct8ZdS6PitbD2Co05ei0ELzbRr37gD4Yo4Gxvg0",
        "discountPrice": 11.99,
        "originalPrice": 129.99,
        "numViews": 0,
        "curriculum": []
    },
    {
        "title": "React Native - The Practical Guide [2020 Edition]",
        "subtitle": "Use React Native and your React knowledge to build native iOS and Android Apps - incl. Push Notifications, Hooks, Redux",
        "descriptions": [],
        "reviews": [],
        "rating": "4.6",
        "students": [],
        "image1xURL": "https://img-a.udemycdn.com/course/240x135/1436092_2024_4.jpg?NURmOqg_rlQlqLz8KOrzxGKaNCrZFN3PQIK80JQOO4soLK4rDyaAIrYMz3HowqwnAjc4sMlpJ4PLNAdiQ7SEtoXV6WsS6mzKBtc9em19HxoLGQ0ogtV4yp-GZt58fXQ1",
        "image2xURL": "https://img-a.udemycdn.com/course/480x270/1436092_2024_4.jpg?4X1Z9ZNHAz-PUoR7loxm7-UiLhgKYpG4T4nEhr5XB-CLO4QGbAiL79oAA7ZULxQS5dkkNJDLPxl5jOBa4ijQ7p77bUUl53_9ALDtxMG6gbP33FyaJpkRVRAwUWJX4Ljb",
        "discountPrice": 11.99,
        "originalPrice": 129.99,
        "numViews": 0,
        "curriculum": []
    },
    {
        "title": "The Complete Android Oreo Developer Course - Build 23 Apps!",
        "subtitle": "Learn Android O App Development using Java & Kotlin - build real apps including Super Mario Run, Whatsapp and Instagram!",
        "descriptions": [],
        "reviews": [],
        "rating": "4.4",
        "students": [],
        "image1xURL": "https://img-a.udemycdn.com/course/240x135/1405812_931d_2.jpg?qz5jB8oX_JVIDQRAFE4s-ogWntZOfWy5B4o8Pa8u2q91D-frxTMJZHonWWLmq33-50PfU9fNPFMfL3wzp6grbCO8e5-3ZwcO7ToV04cx-VGYrzEXOMw2Dcu_4Uu9ZMtT",
        "image2xURL": "https://img-a.udemycdn.com/course/480x270/1405812_931d_2.jpg?r9OLyEnoCKvfo-L7RMkCh07EFZftzga5yiNjaQ5OI8WGMMYKNGvNcbjB-DzqqItZNSE8an6glKYCMN7o9AuE1TE6tlZxro6FV6wWNOmolrYGYWn37X7lNqsk-oysjy4g",
        "discountPrice": 11.99,
        "originalPrice": 129.99,
        "numViews": 0,
        "curriculum": []
    },
    {
        "title": "iOS 10 & Swift 3: From Beginner to Paid Professional™",
        "subtitle": "The most comprehensive course on iOS development - become a master of app development",
        "descriptions": [],
        "reviews": [],
        "rating": "4.3",
        "students": [],
        "image1xURL": "https://img-a.udemycdn.com/course/240x135/892102_963b.jpg?uA--Rq4mJBXGmzTgfmI1jzbUjCe-C-TeJw9_SNv1QLbjyUw8VvZvtmc3X9kqF_WBm_OCzy3jFIoLOixZRDhOrze9UuSiUE6Er1hPdFX6VpM728NWcOOneiAaVYOG",
        "image2xURL": "https://img-b.udemycdn.com/course/480x270/892102_963b.jpg?secure=Gp9EEtOkUTytitsdHr3KIw%3D%3D%2C1607437270",
        "discountPrice": 16.99,
        "originalPrice": 179.99,
        "numViews": 0,
        "curriculum": []
    },
    {
        "title": "Ionic - Build iOS, Android & Web Apps with Ionic & Angular",
        "subtitle": "Build Native iOS & Android as well as Progressive Web Apps with Angular, Capacitor and the Ionic Framework (Ionic 4+).",
        "descriptions": [],
        "reviews": [],
        "rating": "4.7",
        "students": [],
        "image1xURL": "https://img-a.udemycdn.com/course/240x135/1070124_3a0f_4.jpg?dXJgOxbsibdqW2XJbt7JXBOlx3YKTXd0xK1HGn9iH49P-KhYNhuTL-xsPzw69Os6SLW9AG1It1aImghbjoHOyrVuvcuO1NZ2O35jqGjmE4JgoWwW3meP4dOdvHLk33fb",
        "image2xURL": "https://img-a.udemycdn.com/course/480x270/1070124_3a0f_4.jpg?1CJN6qYeRQ_ZgFuaaVBtlz6GVs6jpL3tiZnkk7l3OnOKleaH2mMEg0neSIdWvri1Gq1UOq6RZGcfT_9vJrgOaoDuARRA4vQzp7wl43Q4iytqNGnCakBZmpd0TWdhywJu",
        "discountPrice": 11.99,
        "originalPrice": 129.99,
        "numViews": 0,
        "curriculum": []
    },
    {
        "title": "The Complete iOS 10 & Swift 3 Developer Course",
        "subtitle": "Learn iOS App Development by building 21 iOS apps using Swift 3 & Xcode 8. Includes free web hosting, assets & ebook.",
        "descriptions": [],
        "reviews": [],
        "rating": "4.5",
        "students": [],
        "image1xURL": "https://img-b.udemycdn.com/course/240x135/895786_7b4b_2.jpg?secure=l_8nZjz5GUNIe4tb9f2TCw%3D%3D%2C1607435509",
        "image2xURL": "https://img-a.udemycdn.com/course/480x270/895786_7b4b_2.jpg?ZAXgkagEbFfD2Qrhf5yDWDGu5vCQJBXbfILNpzbCfISL8vc0ovzk6oUof8BPAyOyDWfh4mAP4dB2J-HK5bVO5rfKnFsBN184rjLrDuFcrS7vUlQfs46hK0KUw67_65s",
        "discountPrice": 12.99,
        "originalPrice": 139.99,
        "numViews": 0,
        "curriculum": []
    },
    {
        "title": "Xamarin Forms: Build Native Cross-platform Apps with C#",
        "subtitle": "Learn to build native mobile apps for Android, iOS and Windows using your existing C# skills",
        "descriptions": [],
        "reviews": [],
        "rating": "4.3",
        "students": [],
        "image1xURL": "https://img-b.udemycdn.com/course/240x135/951684_9c1a_2.jpg?secure=SmB8n99zIy8rwHac6IVFKg%3D%3D%2C1607408620",
        "image2xURL": "https://img-a.udemycdn.com/course/480x270/951684_9c1a_2.jpg?SxVHPRln5m9Xz0nfO4w0JSzxncPSAINXeYOyNQkziL08-HmUevKXbJFpbA0rnUjtPIZZ-wbj0VDeGPWKgQ7X5S942ZHLldftJdPNlFqjZg8JX5Tfz6MJhTB28dYw5Xs",
        "discountPrice": 11.99,
        "originalPrice": 129.99,
        "numViews": 0,
        "curriculum": []
    },
    {
        "title": "Android Java Masterclass - Become an App Developer",
        "subtitle": "Improve your career options by learning Android app Development. Master Android Studio and build your first app today",
        "descriptions": [],
        "reviews": [],
        "rating": "4.5",
        "students": [],
        "image1xURL": "https://img-a.udemycdn.com/course/240x135/919872_ed54_6.jpg?4DIgn5dTr6JjmhZs3vzwqBIvhH96ndcLQ1st0njEyzm9PyPRJqF5-8KcRV601y5GQVEN9qdWAGQL9uW4U4XQUUBZ53nYmACu1VuABo4qrKSp3wtFseAkXvyapODneiM",
        "image2xURL": "https://img-a.udemycdn.com/course/480x270/919872_ed54_6.jpg?EfojP0UiE268gORgbLo4eucvECF4JZwfIt_cNCtDaeqqzesrHEh3Y0aHm5dNNKdVOICgs4Sin9Ts8eZvvP_Rqatv2KruaTL9D9rIReaDHvENpr29_etoq1xa_cqvA1Q",
        "discountPrice": 11.99,
        "originalPrice": 99.99,
        "numViews": 0,
        "curriculum": []
    },
    {
        "title": "Android O & Java - The Complete Android Development Bootcamp",
        "subtitle": "Learn Android O app development from beginning to end. Learn to code in Java while building fun Android O projects.",
        "descriptions": [],
        "reviews": [],
        "rating": "4.6",
        "students": [],
        "image1xURL": "https://img-a.udemycdn.com/course/240x135/1212244_825c_2.jpg?vQpst-d0k72sbi31I8yre6saV0EPE-XjBkwQ5Zh60A-DVVjgO570Nm-GaoaEwHf4kwF9OhzE1O4BkD-9L2LGVpf61j8Zm-eo0mV2i4W7mOlbJKy2BmnK74AaFXLofS0P",
        "image2xURL": "https://img-a.udemycdn.com/course/480x270/1212244_825c_2.jpg?-Lhs7yBJQmJcwBn9eRRp6yVfsfgvQqfmcKO0Abol3V5C9Nxt-KkYUOpqwGlZvEdDigcDeX0YmDM_xOn842snrK9asSC5tRxPhlTCZ2zz4oo1nR1E6t6SjvgBGCXuboiF",
        "discountPrice": 11.99,
        "originalPrice": 129.99,
        "numViews": 0,
        "curriculum": []
    },
    {
        "title": "The Complete Android Kotlin Developer Course",
        "subtitle": "Learn how to build 17 online games, and apps for Android Q, like Pokémon , twitter,Tic Tac Toe, and notepad using Kotlin",
        "descriptions": [],
        "reviews": [],
        "rating": "4.2",
        "students": [],
        "image1xURL": "https://img-a.udemycdn.com/course/240x135/1207960_a8af_2.jpg?htGyblBWeaVB46A_3zZl2aCnPif7UPBEHWv0MAgf2q2Dfh-eVmP6_n-otkdTjIERFYwJIOzZ_uAohKFc3CxyQrLt4GhH0LzM6V51aFKfj3Ykip5hBW_HapHfvHXk7A9b",
        "image2xURL": "https://img-a.udemycdn.com/course/480x270/1207960_a8af_2.jpg?KSBXHCkOYwkOklODISecYs7q13ZtJWtyNwEOi7zXo8j5JT7dbzVsONxfpnJIuIGouCjBf2g4C-F5NRAD8MAGMTd9d8C7F97t-ie-QmjiVVhTjXdrl6U0bYzPsSGYiaQ2",
        "discountPrice": 11.99,
        "originalPrice": 129.99,
        "numViews": 0,
        "curriculum": []
    },
    {
        "title": "The Complete Android & Java Developer Course - Build 21 Apps",
        "subtitle": "Learn Android Development, Java & Android Studio from Scratch in 5 Weeks. Build a Diary App & more",
        "descriptions": [],
        "reviews": [],
        "rating": "4.4",
        "students": [],
        "image1xURL": "https://img-a.udemycdn.com/course/240x135/360920_681f_21.jpg?nK_KQLUHWdZy4dRDj1c5o8c3wr6Akc_a86_Dw6mj4XVEQ0Qe_kqJqHUHiTwO8ModgQ-I8MPybzIz_TCR1I9hFZGJvf-muM33JkkrGGQXWNQ1ge_paOtVxW4BozIdELfA",
        "image2xURL": "https://img-a.udemycdn.com/course/480x270/360920_681f_21.jpg?xoi6IDRf82xn7ld90__D8OBCjbAes4aYCeNTYynYiStqn58ODqk7Zcqm9k_VPTiSnuUzwOmh2bBdldwWLaQshiACB3gVJB9Xp-XezX8AeASzbMzY5F37gYK1VOv02akR",
        "discountPrice": 11.99,
        "originalPrice": 129.99,
        "numViews": 0,
        "curriculum": []
    }


]

var reviews = [
    // review 0
    {
        body: "Being a fresher as a web developer this course helped me not only to understand web coding in such a easy way but also made each section of the course interesting and enjoyable due to the awesome teaching method by 'Colt Steele'.",
        rating: 5,
        // author: ""
    },
    // review 1
    {
        body: "Great course while studying computer science students during summer vacation and I enjoyed each part of the course. Whoever is having passion for web development must pursue this course for having better knowledge about front and back end development.",
        rating: 5,
        // author: ""
    },
    // review 2
    {
        body: "It is an amazing course, earlier I didn't have the confidence to work on UI but after this course, I have the confidence that I can build and understand the code that is written by any JS developer.",
        rating: 5,
        // author: ""
    },
    // review 3
    {
        body: "Awesome course for beginners ,teaches you more than just Javascript,this course teaches you ,what you would do when you actually end up in a Javascript deeveloper job ,all the practical concpets which are used in the companies are taught ,like babel,webpack ,how to setup a localhost, MVC ,HTML DOM manipulation ,ES6 and many such practical real world concepts are covered rather than just the basic syntax of Javascript which you can study from W3schools also,So this is a must do course for a beginner who wants to be a Javascript developer.",
        rating: 4.5,
        // author: ""
    },
    // review 4
    {
        body: "This is the best course I’ve ever attended so far. Angela has taken so much effort to make this an exhaustive course covering all aspects of app development including minute details like Xcode shortcuts, best practices, useful websites etc… I really liked the way Angela talks with her soothing voice.",
        rating: 5,
        // author: ""
    },
    // review 5
    {
        body: "Oh my God, taking this course was pretty much like giving a glass of water to somebody living in hell, I mean with all these options you got, going to college, books and all that stuff there is no other person as good as a programming teacher as Angela, I've poured thousands of dollars on trying to learn all this stuff in college but it's been just a waste of money and time. 100% recommended, learning iOS development really changed my life in a big way tbh!",
        rating: 5,
        // author: ""
    },
    // review 6
    {
        body: "This is one of the most complex and useful Udemy course for Android development. Even if most of the projects are no more compatible with the actual Android Studio 4.x version, you can still follow the videos with some workaround. For anyone who wants to follow this great course I saved my projects source code fully compatible with Android Studio 4x at this link: https://github.com/mathexa/Complete-Android-N-Udemy-course-for-Android-Studio-4",
        rating: 5,
        // author: ""
    },
    // review 7
    {
        body: "It was an Amazing course. Just Loved It......??",
        rating: 4.5,
        // author: ""
    },
]
var fields = [
    {
        name: "web-development",
        courses: []
    },
    {
        name: "mobile-development",
        courses: []
    }
]
async function seedDB() {
    // clear all database collection documents
    await Course.deleteMany({});
    await User.deleteMany({});
    await Review.deleteMany({});
    await Field.deleteMany({});
    console.log("cleared all database collection documents")

    for (var i = 0; i < reviews.length; i++) {
        await Review.create(reviews[i]);
    }

    for (var i = 0; i < fields.length; i++) {
        await Field.create(fields[i]);
    }

    for (var i = 0; i < students.length; i++) {
        await User.create(students[i]);
    }
    for (var i = 0; i < instructors.length; i++) {
        await User.create(instructors[i]);
    }

    for (var i = 0; i < courses.length; i++) {
        await Course.create(courses[i]);
    }
    console.log("seeded database");

    reviews = await Review.find({});
    fields = await Field.find({});
    students = await User.find({ role: "s" })
    instructors = await User.find({ role: "i" });
    courses = await Course.find({});

    for (var i = 0; i < 16; i++) {
        // courses belong field[0]
        courses[i].field = fields[0];
        await courses[i].save();
        // courses belong field[1]
        courses[i + 16].field = fields[1];
        await courses[i + 16].save();
    }

    // instructor[0] teaches course[0]
    courses[0].instructor = instructors[0];
    await courses[0].save();
    // instructor[2] teaches course[2]
    courses[2].instructor = instructors[2];
    await courses[2].save();

    // students[0] enrolls in courses[0];
    students[0].enrolledCourses.push(courses[0]);
    reviews[0].author = students[0];    
    await students[0].save();
    await reviews[0].save();
    // courses[0] contains students[0]
    courses[0].students.push(students[0]);    
    courses[0].reviews.push(reviews[0]);
    await courses[0].save();
    



    // fields[0] contains all of its courses
    for (var i = 0; i < 16; i++) {
        fields[0].courses.push(courses[i]);
    }
    // fields[1] contains all of its courses
    for (var i = 16; i < 32; i++) {
        fields[1].courses.push(courses[i]);
    }

    await fields[0].save();
    await fields[1].save();


}
module.exports = seedDB;