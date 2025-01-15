import * as React from 'react';
import Grid from "@mui/material/Grid"
import { Provider } from "react-redux"
import UserForm from "./components/userForm";
import UserTable from "./components/userTable";
import store from './store'

const App = () => {

    return (
        <>
            <Provider store={store}>
                <Grid
                    container
                    spacing={{ xs: 2, md: 3 }}
                    direction="row"
                    sx={{
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <Grid item xs={12} md={4} lg={4}>
                        <UserForm />
                    </Grid>
                    <Grid item xs={12} md={8} lg={6}>
                        <UserTable />
                    </Grid>
                </Grid>
            </Provider>
        </>
    );
};
export default App;