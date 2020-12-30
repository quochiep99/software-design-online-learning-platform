module.exports = (currentUser) => {
    if (!currentUser) {
        return;
    }
    // if currentUser is a student
    if (currentUser.role === "s") {
        return `
        <li><span><a href="#">Student</a></span>
                        <ul>                            
                            <li><a href="/my-courses/learning">All enrolled courses</a></li>
                            <li><a href="/my-courses/wishlist">Wishlist</a></li>
                        </ul>
                    </li>
        `
    } else if (currentUser.role === "i") {
        // if currentUser is an instructor
        return `
        <li><span><a href="#">Instructor</a></span>
                        <ul>
                            <li><a href="/courses/new">New course</a></li>
                            <li><a href="#">View uploaded courses</a></li>                            
                        </ul>
                    </li>
        `
    }

}