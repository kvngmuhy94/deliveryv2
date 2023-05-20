import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function createData(name, email, status) {
  return { name, email, status };
}

const rows = [
  createData('User1', 'Electronics', "mm/dd/yyyy"),
  createData('User2', 'Fashion', "mm/dd/yyyy"),
  createData('User3', 'Health & Beauty', "mm/dd/yyyy"),
  createData('User4', 'Real Estate', "mm/dd/yyyy"),
  createData('User5', 'Automobiles', "mm/dd/yyyy"),
 
];

export default function NewUsers() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 350 , maxWidth: 500}} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">Company Type</TableCell>
            <TableCell align="right">Date</TableCell>
            
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.email}</TableCell>
              <TableCell align="right">{row.status}</TableCell>
              
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
