import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { Pie } from "@ant-design/plots";
import { Paper } from "../base/Paper";
import { Title } from "../base/Typograpy/index.";
import { useQuery, UseQueryResult } from "react-query";
import { PlansByCustomer } from "../../api/api";
import LoadingSpinner from "../LoadingSpinner";

export const CustomerByPlanPie = (props: any) => {
  const { data, isLoading }: UseQueryResult<any> = useQuery<any>(
    ["customer_by_plan_pie"],
    () =>
      PlansByCustomer.getPlansByCustomer().then((res) => {
        return res;
      })
  );

  const config = {
    legend: {
      position: "bottom" as any,
    },
    appendPadding: 20,
    data: data?.results,
    angleField: "num_customers",
    colorField: "plan_name",
    radius: 1,
    innerRadius: 0.6,
    label: {
      type: "inner",
      offset: "-50%",
      content: "{value}",
      style: {
        textAlign: "center",
        fontSize: 12,
      },
    },
    interactions: [
      {
        type: "element-selected",
      },
      {
        type: "element-active",
      },
    ],
    statistic: {
      title: false,

      content: {
        content: "",
        style: {
          whiteSpace: "pre-wrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        },
      },
    },
  };
  return (
    <Paper color="white" border={true}>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div>
          <h2>Plans Distribution</h2>
          <div className="h-[390px]">
            <Pie {...config} />
          </div>
        </div>
      )}
    </Paper>
  );
};
