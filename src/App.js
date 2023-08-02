import logo from './logo.svg';
import './App.css';
import data from './Data';
import {useState} from 'react';

function GetExperienceString(experience)
{
  if((experience["years"] === 0) && (experience["months"] === 0))
  {
    return "Fresher";
  }
  let experienceString = "";
  if (experience["years"] !== "0")
  {
    experienceString = experience["years"]+" Years";
  }
  if (experience["months"] !== "0")
  {
    if(experienceString !== "")
      experienceString = experienceString + " ";
    experienceString = experienceString + experience["months"] + " Months"
  }
  return experienceString;
}

function PositionComponent({positions}){
  let [positionExpanded, setPositionExpanded] =  useState(false);

  let positionsComponent;
  let buttonText;
  if ((positions.length > 1) && (!positionExpanded))
  {
    positionsComponent = <div>{positions[0]}</div>;
    buttonText = "+"+ (positions.length-1) +" More";
  }
  else{
    positionsComponent = positions.map(position => <div>{position}</div>)
    buttonText = "Collapse";
  }
  let buttonComponent = <button onClick={() => setPositionExpanded(!positionExpanded)}>{buttonText}</button>
  return (
  <div>
    {positionsComponent}
    {buttonComponent}
  </div>
  );
}

function TableRow({candidate}){
  return(
  <tr>
    <td>
      <div>
        {candidate["name"]}
      </div>
      <div>
        {candidate["email"]}
      </div>
    </td>
    <td>{candidate["age"]}</td>
    <td> {candidate["phone"]}</td>
    <td><PositionComponent positions={candidate['position']}></PositionComponent></td>
    <td><div>{'$'+candidate["salary"]+"/year"}</div><div>Average</div></td>
    <td>
      <div>{GetExperienceString(candidate["experience"])}</div>
      <div>{"Last work "+GetExperienceString(candidate["lastWork"])}</div></td>
    <td>
      {candidate["workTypePreference"].map(workType => <div>{workType}</div>)}
    </td>
  </tr>
  );
}

function PaginationTable() {
  let [pageNumber, setPageNumber] = useState(1);
  let recordsPerPage = 4;
  let totalPages = Math.floor(data.length / recordsPerPage) + 1;
  let lowerSlice = ((pageNumber - 1) * recordsPerPage);
  let upperSlice = pageNumber * recordsPerPage;
  return (
    <div>
      <table className='table table-hover'>
        <tr>
          <th>Full Name - Mail</th>
          <th>Age</th>
          <th>Phone Number</th>
          <th>Position</th>
          <th>Salary</th>
          <th>Experience</th>
          <th>Work Type</th>
        </tr>
        {data.slice(lowerSlice, upperSlice).map(candidate => <TableRow candidate={candidate}></TableRow>)}
      </table>
      <div>
        <button onClick={() => {setPageNumber(pageNumber - 1)}}>Previous</button>
        {"Page "+pageNumber+" of "+totalPages}
        <button onClick={() => {setPageNumber(pageNumber + 1)}}>Next</button>
      </div>
    </div>
  );
}

function App() {
  return (
    <div className="App">
      <PaginationTable></PaginationTable>
    </div>
  );
}

export default App;
