const Total = ({ parts }) => 
<p>
    <b>Total of exercises {parts.reduce(
        (previous, current) => previous + current.exercises, 0)}
    </b>
</p>

export default Total