import {useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import Spinner from '../components/Spinner'
import {getCourses, reset} from '../features/courses/courseSlice'
import CourseForm from '../components/CourseForm'
import CourseItem from '../components/CourseItem'

function Dashboard() {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {user} = useSelector((state) => state.auth)
    const {courses, isLoading, isError, message} = useSelector((state) => state.courses)
    useEffect(() => {
        if(isError) {
          console.log(message)
        }
    
        if(!user) {
          navigate('/Login')
          return
        }
    
        dispatch(getCourses())
    
        return () => {
          dispatch(reset())
        }
      }, [user, navigate, isError, message, dispatch])

      if(isLoading) {
          return <Spinner />
        }

  return (
    <>
      <section className="heading">
        <h1>Welcome {user && user.name} </h1>
        <p>StudyBuddy Dashboard</p>
      </section>

      <CourseForm />

      <section className='content'>
        {courses.length > 0 ? (
          <div className='courses'>
            {courses.map((course) => (
              <CourseItem key={course._id} course={course} />
            ))}
          </div>
        ) : (<h3>You have not added any courses</h3>)}
      </section>
    </>
)
}

export default Dashboard