import React, { useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import { useDispatch, useSelector } from 'react-redux';
import { setUserSlice } from '../redux/slice/user';
import { DELETE_USER_BY_ID, GET_USERS } from '../redux/types';

const UserTable = () => {
    const rows = useSelector(state => state.users.list)
    const dispatch = useDispatch()

    useEffect(() => dispatch({ type: GET_USERS }), []);

    return (
        <>
            {rows?.length > 0 && (
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell align="right">Zipcode</TableCell>
                                <TableCell align="right">Timezone</TableCell>
                                <TableCell align="right">Latitude</TableCell>
                                <TableCell align="right">Longitude</TableCell>
                                <TableCell align="right">Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        {row.name}
                                    </TableCell>
                                    <TableCell align="right">{row.zip_code}</TableCell>
                                    <TableCell align="right">{row.timezone}</TableCell>
                                    <TableCell align="right">{row.latitude}</TableCell>
                                    <TableCell align="right">{row.longitude}</TableCell>
                                    <TableCell colSpan={2} align="right">
                                        <IconButton
                                            onClick={() => dispatch(setUserSlice(row))}
                                        >
                                            <EditOutlinedIcon />
                                        </IconButton>
                                        <IconButton
                                            onClick={() => dispatch({ type: DELETE_USER_BY_ID, id: row.id })}
                                        >
                                            <DeleteOutlinedIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
            
        </>
    );
}

export default UserTable