import React, { lazy, Suspense } from "react";
import Loader from "../components/loader/suspenseFallback";

export default function asyncComponent(importComponent) {
  const Component = lazy(importComponent);
  const AsyncFunc = (props) => {
    return (
      <Suspense fallback={<Loader />}>
        <Component {...props} />
      </Suspense>
    );
  }
  return AsyncFunc;
}
