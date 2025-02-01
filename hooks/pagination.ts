import { useState } from "react";
import { User } from "../services/api";

export const pagination = (users: User[]) => {
  const [currentPage, setCurrentPage] = useState(1)
  const totalPages = Math.ceil(users.length / 20)
  const startIndexOfPage = (currentPage - 1) * 20
  const paginatedUsers = users.slice(startIndexOfPage, startIndexOfPage + 20)

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
    }
  }
  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  return {
    currentPage,
    totalPages,
    paginatedUsers,
    goToNextPage,
    goToPreviousPage
  }
}