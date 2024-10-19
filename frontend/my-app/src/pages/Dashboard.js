import { useEffect, useState } from "react";
import { Dashboardnavbar } from "../components/Dashboardnavbar";
import { Job } from "../components/Job";
import { ReactComponent as Home } from './home.svg';
import { useNavigate } from "react-router-dom";

export function Dashboard() {
  const navigate = useNavigate();
  const [btn, setBtn] = useState(true);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [exp, setExp] = useState('');
  const [tags, setTags] = useState([]);
  const [date, setDate] = useState('');

  useEffect(() => {
    const checkToken = () => {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/home');
      }
    };
    checkToken();
  }, [navigate]); // Added dependency array

  return (
    <div>
      <Dashboardnavbar />
      <div className="flex">
        <div className="border-r-2 border-black h-screen">
          <Home 
            onClick={() => setBtn(true)} 
            style={{ cursor: 'pointer' }} // Added cursor style for better UX
          />
        </div>
        <div className="p-8">
          {btn ? (
            <button 
              className="bg-blue-500 hover:bg-blue-400 text-white px-4 py-2 rounded" 
              onClick={() => {
                setBtn(false);
              }}
            >
              Create Interview
            </button>
          ) : (
            <Job 
              title={title} 
              description={description} 
              tags={tags} 
              exp={exp} 
              date={date} 
              setTitle={setTitle} 
              setDescription={setDescription} 
              setTags={setTags} 
              setExp={setExp} 
              setDate={setDate}
            />
          )}
        </div>
      </div>
    </div>
  );
}
