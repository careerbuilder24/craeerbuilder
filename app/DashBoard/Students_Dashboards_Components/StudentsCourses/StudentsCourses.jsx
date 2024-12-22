import React from 'react'

export default function Page() {
    return (

        <>
            <h1>Course Plan</h1>
            <table border="1">
                <thead>
                    <tr>
                        <th>Course Name</th>
                        <th>Credits</th>
                        <th>Instructor</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Math 101</td>
                        <td>3</td>
                        <td>Dr. Smith</td>
                    </tr>
                    <tr>
                        <td>CS 102</td>
                        <td>4</td>
                        <td>Prof. Johnson</td>
                    </tr>
                </tbody>
            </table>
        </>

    )
}
