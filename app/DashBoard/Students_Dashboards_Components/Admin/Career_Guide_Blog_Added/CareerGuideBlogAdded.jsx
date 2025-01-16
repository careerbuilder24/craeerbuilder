export async function getServerSideProps() {
  try {
    const response = await fetch('https://careers-builder2.vercel.app/api/Dashboard_User');
    if (!response.ok) throw new Error('Failed to fetch data');
    
    const result = await response.json();
    return { props: { users: result.data || [] } };
  } catch (error) {
    console.error("Error fetching data:", error);
    return { props: { users: [] } };
  }
}

export default function CareerGuideBlogAdded({ users }) {
  return (
    <div>
      <h1>User List</h1>
      <table border="1" style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>User No</th>
            <th>Email</th>
            <th>Power</th>
            <th>Image</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.User_No}>
              <td>{user.User_No}</td>
              <td>{user.email}</td>
              <td>{user.power}</td>
              <td>
                <img src={user.image_url} alt="User" style={{ width: '50px', height: '50px', borderRadius: '5px' }} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
