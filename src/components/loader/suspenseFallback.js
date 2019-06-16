import { Component } from "react";
import Nprogress from "nprogress";
import "nprogress/nprogress.css";
// import Loader from "./loader";

export default class FallBack extends Component {
  componentWillUnmount() {
    Nprogress.done();
  }
  render () {
    Nprogress.start();
    return null;
  }
}