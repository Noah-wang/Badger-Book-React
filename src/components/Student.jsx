const Student = (props) => {
    return <div>
        <h2>{props.name.first} {props.name.last}</h2>
        <p>{props.major}</p>
        <p>{props.name.first} is taking {props.numCredits} credits and {props.fromWisconsin ? 'is':'is not'} from Wisconsin.</p>
        <p>They have {props.interests.length} interests including...</p>
        <ul>
            {props.interests.map((interests, index) => (
              <li key={index}>{interests}</li> // Using the interest itself as a key assuming they are unique per person
            ))}
            </ul>
        
    </div>
}

export default Student;