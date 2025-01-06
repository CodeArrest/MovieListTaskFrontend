"use client";
import React, { useEffect, useState } from "react";
import EmptyMovieList from "@/components/EmptyMovieList/EmptyMovieList";
import SingleMovieCard from "@/components/SingleMovieCard/SingleMovieCard";
import StyledTypography from "@/components/StyledTypography/StyledTypography";
import { Pagination, Stack, Box } from "@mui/material";
import { useRouter } from "next/navigation";
import axios from "axios";
import { BASE_URL } from "@/config/config";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import Header from "@/components/Header/Header";

export default function MovieList() {
  const [movieList, setMovieList] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const router = useRouter();

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const getAllMovies = async (page: number) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        router.push("/");
        return;
      }

      const response = await axios.get(
        `${BASE_URL}/movies/getAllMovies?page=${page}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMovieList(response.data.data);
      setTotalPages(response.data.pagination.totalPages);
    } catch (error) {
      console.error("Error fetching movies:", error);
      setMovieList([]);
    }
  };

  useEffect(() => {
    getAllMovies(page);
  }, [page]);

  return movieList?.length === 0 ? (
    <EmptyMovieList />
  ) : (
    <Stack sx={{ margin: { xs: "70px 30px", sm: "50px 20px", md: "" } }}>
      <Header />
      <Stack
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "center",
          margin: { xs: "10px 5px", sm: "10px 10px", md: "10px" },
          padding: { xs: "20px 0px", sm: "10px", md: "10px" },
        }}
      >
        {movieList.map((item, key) => (
          <SingleMovieCard item={item} key={key} />
        ))}
      </Stack>
      <Stack justifyContent={"center"} alignItems={"center"} zIndex={999999}>
        <Pagination
          color="primary"
          count={totalPages}
          page={page}
          onChange={handleChange}
        />
      </Stack>
    </Stack>
  );
}
