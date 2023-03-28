import Link from "next/link";
import React from "react";

function Footer() {
  return (
    <footer className="p-4 bg-gray-200 py-14 md:px-6">
      <div className="sm:flex sm:items-center sm:justify-between">
        <Link href={"/"}>
          <a className="flex items-center mb-4 sm:mb-0">
            <h1 className="text-2xl font-semibold">City</h1>
            {/* <img src="https://flowbite.com/docs/images/logo.svg" className="mr-3 h-8" alt="Flowbite Logo"> */}
            <span className="self-center text-2xl font-bold whitespace-nowrap">
              Zen™
            </span>
          </a>
        </Link>
        <ul className="flex flex-wrap items-center mb-6 text-sm text-gray-900 sm:mb-0 ">
          <li>
            <Link href="/about">
              <a className="mr-4 hover:underline md:mr-6 ">About</a>
            </Link>
          </li>
          <li>
            <Link href="#">
              <a className="mr-4 hover:underline md:mr-6">Privacy Policy</a>
            </Link>
          </li>
          <li>
            <Link href="#">
              <a className="mr-4 hover:underline md:mr-6 ">Licensing</a>
            </Link>
          </li>
          <li>
            <Link href="#">
              <a className="hover:underline">Contact</a>
            </Link>
          </li>
        </ul>
      </div>
      <hr className="my-6 border-gray-200 sm:mx-auto lg:my-8" />
      <span className="block text-sm font-serif text-gray-800 sm:text-center">
        © 2022{" "}
        <a href="/" className="hover:underline">
          Cityzen™
        </a>
        . All Rights Reserved.
      </span>
    </footer>
  );
}

export default Footer;
