"use client";

import { useEffect, useState } from "react";
import {
  PortfolioCvData,
  DEFAULT_PORTFOLIO_CV_DATA,
  loadPortfolioCvData,
  savePortfolioCvData,
  resetPortfolioCvData,
  mergeWithDefaults,
} from "./portfolioCvData";
import { supabase, isSupabaseConfigured } from "./supabase";

const SYNC_EVENT = "nodexa_portfolio_cv_sync";

export function usePortfolioCvData() {
  const [data, setData] = useState<PortfolioCvData>(() => loadPortfolioCvData());

  useEffect(() => {
    // Al montar, recargar por si cambió en otra pestaña o en localStorage
    setData(loadPortfolioCvData());

    if (isSupabaseConfigured) {
      supabase
        .from("portfolio_cv_config")
        .select("data")
        .eq("id", 1)
        .maybeSingle()
        .then(({ data: row, error }) => {
          if (!error && row?.data) {
            setData(() => {
              const merged = mergeWithDefaults(row.data);
              localStorage.setItem("nodexa_portfolio_cv_data_v1", JSON.stringify(merged));
              return merged;
            });
          }
        });
    }

    const handleSync = (event: Event) => {
      const customEvent = event as CustomEvent<PortfolioCvData>;
      if (customEvent.detail) {
        setData(customEvent.detail);
      } else {
        setData(loadPortfolioCvData());
      }
    };

    const handleStorage = (event: StorageEvent) => {
      if (event.key === "nodexa_portfolio_cv_data_v1") {
        setData(loadPortfolioCvData());
      }
    };

    window.addEventListener(SYNC_EVENT, handleSync);
    window.addEventListener("storage", handleStorage);

    return () => {
      window.removeEventListener(SYNC_EVENT, handleSync);
      window.removeEventListener("storage", handleStorage);
    };
  }, []);

  const updateData = (newData: PortfolioCvData) => {
    setData(newData);
    savePortfolioCvData(newData);
  };

  const resetData = () => {
    const res = resetPortfolioCvData();
    setData(res);
  };

  return { data, updateData, resetData };
}
