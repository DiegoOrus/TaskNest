const ActiveCount = ({activeCount})=>{
    return(
        <>
        <p className = "ActiveCount">
            {activeCount} {activeCount === 1 ? 'Active Task' : 'Active Tasks'}
        </p>
        </>

    )
}
export default ActiveCount;