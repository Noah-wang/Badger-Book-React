import { Button, Container, Form, Row, Col, Pagination } from "react-bootstrap";
import { useEffect, useState } from "react"
import Student from "./Student";

const Classroom = () => {
    //step1: fetch data
    const [students, setStudents] = useState([]);
    const [shownStudents, setShownStudents] = useState([]);
    const [searchName, setSearchName] = useState("");
    const [searchMajor, setSearchMajor] = useState("");
    const [searchInterest, setSearchInterest] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const studentsPerPage = 24;

    //step1: fetch data
    useEffect(() => {
        fetch("https://cs571.org/api/s24/hw4/students", {
            headers: {
                "X-CS571-ID": CS571.getBadgerId()
            }
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                //step2 show students
                setStudents(data);
                setShownStudents(data);
            })
    }, [])

    useEffect(() => {
        setCurrentPage(1);
        const filteredStudents = students.filter(student => {
            const fullName = `${student.name.first} ${student.name.last}`.toLowerCase();
            const nameMatch = searchName.trim() === "" || fullName.includes(searchName.trim().toLowerCase());
            const majorMatch = searchMajor.trim() === "" || student.major.toLowerCase().includes(searchMajor.trim().toLowerCase());
            const interestMatch = searchInterest.trim() === "" || student.interests.some(interest => interest.toLowerCase().includes(searchInterest.trim().toLowerCase()));

            return nameMatch && majorMatch && interestMatch;
        });

        setShownStudents(filteredStudents);
    }, [searchName, searchMajor, searchInterest, students]);

    //reset function
    const resetSearch = () => {
        setSearchName("");
        setSearchMajor("");
        setSearchInterest("");
        setShownStudents(students);
        setCurrentPage(1);
    };

    const getPaginatedData = () => {
        const startIndex = (currentPage - 1) * studentsPerPage;
        const endIndex = startIndex + studentsPerPage;
        return shownStudents.slice(startIndex, endIndex);
    };

    const getPagination = () => {
        let items = [];
        const totalPages = Math.ceil(shownStudents.length / studentsPerPage);

        // Ensure the Prev button has a unique key
        items.push(<Button key= "prev" onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                
        disabled={currentPage === 1 || shownStudents.length === 0   }>Previous</Button>
        
        );

        for (let number = 1; number <= totalPages; number++) {
            items.push(
                <Pagination.Item
                    key={number}
                    active={number === currentPage}
                    onClick={() => setCurrentPage(number)}>
                    {number}
                </Pagination.Item>,
            );
        }


        items.push(
            <Button
                key="next"
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages || shownStudents.length === 0}>Next</Button>
            
        );

        return items;
    };


    return <div>
        <h1>Badger Book</h1>
        <p>Search for students below!</p>
        <hr />
        <Form>
            <Form.Label htmlFor="searchName">Name</Form.Label>
            <Form.Control
                id="searchName"
                value={searchName}
                onChange={(e) => setSearchName(e.target.value)}
            />
            <Form.Label htmlFor="searchMajor">Major</Form.Label>
            <Form.Control
                id="searchMajor"
                value={searchMajor}
                onChange={(e) => setSearchMajor(e.target.value)}
            />
            <Form.Label htmlFor="searchInterest">Interest</Form.Label>
            <Form.Control
                id="searchInterest"
                value={searchInterest}
                onChange={(e) => setSearchInterest(e.target.value)}
            />
            <br />
            <Button onClick={resetSearch} variant="neutral">Reset Search</Button>


            <p>There are {shownStudents.length} student(s) matching your search.</p>
        </Form>
        <Container fluid>
            <Row>
                {getPaginatedData().map((student, index) => (
                    <Col xs={12} sm={12} md={6} lg={4} xl={3} key={index}>
                        <Student key={index}{...student} />
                    </Col>
                ))}
            </Row>
        </Container>
        <Pagination>{getPagination()}</Pagination>
    </div>

}

export default Classroom;
