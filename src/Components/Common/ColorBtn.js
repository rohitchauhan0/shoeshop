
import { Link } from 'react-router-dom'

const ColorBtn = ({children, linkto, extra, type}) => {
  return (
    <div>
         <Link to={linkto}>
        <button className={` p-3 border border-white rounded-2xl btnColor font-bold px-5 flex gap-5 items-center ${extra}`} type={type}>
            {children}
        </button>
        </Link>
    </div>
  )
}

export default ColorBtn