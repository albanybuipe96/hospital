import styles from "../../styles/table.module.css";
import { LinkContainer } from "react-router-bootstrap";
import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { deleteUser } from "../../redux/actions/user";
const Table = ({ data, columns }) => {
  const dispatch = useDispatch();
  const deleteHandler = (id) => {
    if (window.confirm("Are you sure?")) {
      dispatch(deleteUser(id));
    }
  };

  return (
    <table className={`table-sm ${styles.styledTable}`}>
      <thead>
        <tr>
          {columns.map((column) => (
            <th>{column}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data?.map((user) => (
          <tr key={user._id}>
            <td>{user.createdAt}</td>

            <td>{user.fName + " " + user.lName}</td>
            <td>
              <a href={`mailto:${user.email}`}>{user.email}</a>
            </td>
            <td>{user.role}</td>
            <td>
              <LinkContainer to={`/admin/user/${user._id}/edit`}>
                <Button variant="light" className="btn-sm">
                  <i className="bi bi-pencil"></i>
                </Button>
              </LinkContainer>
              <Button
                variant="danger"
                className="btn-sm"
                onClick={() => deleteHandler(user._id)}
              >
                <i className="bi bi-trash"></i>
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
      <style jsx>{``}</style>
    </table>
  );
};

export default Table;
