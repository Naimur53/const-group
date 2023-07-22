import { Box, Container, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import {
  allGroup,
  selectData,
  setGpInfo,
} from "../../../features/data/dataSlice";
import GroupCard from "../../SmallComponents/GroupCard/GroupCard";
import AddIcon from "@mui/icons-material/Add";

const Groups = () => {
  const dispatch = useDispatch();
  const data = useSelector(selectData);

  // Step 1: State for Search Query
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    dispatch(allGroup());
    dispatch(setGpInfo({}));
  }, [dispatch]);

  // Step 3: Filter Data Based on Search Query
  const filteredGroups = data?.groups?.filter((sData) =>
    sData.gpName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className=" ">
      <Container>
        {/* Step 2: Create a Search Input */}
        <input
          type="text"
          placeholder="Search by group name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border rounded-md p-2 mb-4 inline-block w-full mt-5 border-gray-900"
          style={{ background: "#ffffff26" }}
        />

        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <div className="h-full  w-full p-2 ">
              <Box
                component={NavLink}
                to="/group/create"
                style={{ backgroundColor: "#ffffff26", minHeight: "270px" }}
                className=" flex justify-center sm:py-3 items-center w-full h-full rounded-md"
              >
                <div>
                  <AddIcon sx={{ fontSize: 100 }}></AddIcon>
                  <h1 className="text-xl text-center">Create Group</h1>
                </div>
              </Box>
            </div>
          </Grid>
          {/* Step 3 (Continued): Use the filteredGroups */}
          {filteredGroups.map((sData) => (
            <GroupCard key={sData._id} info={sData}></GroupCard>
          ))}
        </Grid>
      </Container>
    </div>
  );
};

export default Groups;
