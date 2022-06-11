import Header from "./Header"
import Content from "./Content"
import Total from "./Total"

const Course = ({ course}) => 
    <div>
    <Header course={course} />
    <Content parts={course.parts} />
    <Total parts={course.parts} />
    </div>

export default Course