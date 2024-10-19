import TagInput from "./TagInput";

export function Job({ title, description, exp, tags, date, setTitle, setDescription, setExp, setTags, setDate }) {
  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleExpChange = (e) => {
    setExp(e.target.value);
  };

  const handleDateChange = (e) => {
    setDate(e.target.value);
  };

 async function sendhandler(){
    const token = localStorage.getItem('token');
    try{
        const response = await fetch('http://localhost:3000/user/jobpost',{
            method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                      "Authorization" :`Bearer ${token}`
                    },
                    body: JSON.stringify({
                        "jobTitle": title,
                        "jobDescription": description,
                        "experienceLevel": exp,
                        "date": date,
                        "candidate": tags
                      })
        })
        const result = await response.json();
        alert(result.msg);
    }catch(err){
        alert("some error occured");
    }
  }

  return (
    <div className="p-8 flex flex-col gap-10 h-full">
      <h2 className="font-medium text-2xl">Edit Course</h2>
      <div className="flex gap-2">
        <h1 className="text-black text-xl">Job Title</h1>
        <input
          className="px-4 py-2 ring-2 ring-black-100"
          type="text"
          placeholder="Job title"
          value={title} // Set value to reflect the state
          onChange={handleTitleChange}
        />
      </div>
      <div className="flex gap-2">
        <h1 className="text-black text-xl">Job Description</h1>
        <textarea
          className="px-4 py-2 ring-2 ring-black-100"
          placeholder="Description of the job"
          value={description} // Set value to reflect the state
          onChange={handleDescriptionChange}
        />
      </div>
      <div className="flex gap-2">
        <h1 className="text-black text-xl">Experience Level</h1>
        <select
          className="border-2 border-black"
          value={exp} // Set value to reflect the state
          onChange={handleExpChange}
        >
          <option value="mid">Mid</option>
          <option value="fresher">Fresher</option>
          <option value="senior">Senior</option> {/* Corrected the spelling to "Senior" */}
        </select>
      </div>
      <div>
        <TagInput tags={tags} setTags={setTags} />
      </div>
      <div className="flex gap-2">
        <h1 className="text-black text-xl">Date</h1>
        <input
          className="border-2 border-black"
          type="date"
          value={date} // Set value to reflect the state
          onChange={handleDateChange}
        />
      </div>
      <button className="bg-blue-500 hover:bg-blue-400 text-white px-4 py-2 rounded w-20" onClick={()=>{
          sendhandler();
      }}>
        Send
      </button>
    </div>
  );
}
