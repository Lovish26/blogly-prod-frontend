import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Posts from "../components/Posts";
import Spinner from "../components/Spinner";
import ReactPaginate from "react-paginate";
import Newsletter from "../components/Newsletter";

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  let limit = 5;
  useEffect(() => {
    const host = "https://blogly.onrender.com";
    fetch(`${host}/api/v1/posts?page=1&limit=${limit}`).then((res) => {
      res.json().then((data) => {
        setPosts(data.posts);
        const totalResults = data.results;
        setPageCount(Math.ceil(totalResults / limit));
        setLoading(false);
      });
    });
  }, [limit]);

  const fetchPosts = async (currentPage) => {
    const host = "https://blogly.onrender.com";
    const res = await fetch(
      `${host}/api/v1/posts?page=${currentPage}&limit=${limit}`
    );
    const data = await res.json();
    return data.posts;
  };

  const handlePageClick = async (data) => {
    let currentPage = data.selected + 1;
    const paginatedPosts = await fetchPosts(currentPage);
    setPosts(paginatedPosts);
  };

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <div className=" home-wrapper  my-52 px-20">
            <div className="hero-wrapper flex flex-col w-2/3 ml-auto pb-52 relative">
              <p className="absolute top-[-10px] left-[-100px] uppercase font-medium text-[12px] text-[#111] inline-block tracking-[3px] mb-[5px]">
                Create your{" "}
                <span className="border-b-[1px] border-[#111] pb-1">Blog</span>
              </p>
              <h1 className="text-[14vw] font-extrabold text-[#444] mb-4 leading-[1.2]">
                B<span className="brand-logo">logl</span>
                y.
              </h1>
              <h4 className="text-[30px] tracking-[1px] font-extralight text-[#919191] leading-[1.5] py-6 pr-28 ml-64">
                Want to write blogs free of cost? Blogly is the way to go.
              </h4>
            </div>
            <div className="posts-wrapper flex flex-col">
              {posts.length > 0 &&
                posts.map((post) => <Posts key={post._id} {...post} />)}
            </div>

            {/* ********** */}
            {/* Pagination */}
            {/* ********** */}
            <ReactPaginate
              className="pagination"
              previousLabel="<"
              nextLabel=">"
              breakLabel="..."
              pageCount={pageCount}
              onPageChange={handlePageClick}
            />
          </div>
          {/* ********** */}
          {/* Newsletter */}
          {/* ********** */}
          <Newsletter />

          {/* ********** */}
          {/*   Footer   */}
          {/* ********** */}
          <Footer />
        </>
      )}
    </>
  );
};

export default Home;
