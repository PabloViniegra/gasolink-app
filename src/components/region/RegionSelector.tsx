import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SelectComponent } from "../shared/SelectComponent";
import {
  mapProvincesToSelectItems,
  mapLocalitiesToSelectItems,
} from "../../lib/utils";
import { useLocalities } from "../../hooks/useLocalities";
import { Province } from "../../types";
import { Skeleton } from "@heroui/react";

interface Props {
  provinces: Province[];
  isLoadingProvinces: boolean;
}

export default function RegionSelector({
  provinces,
  isLoadingProvinces,
}: Props) {
  const [selectedProvinceId, setSelectedProvinceId] = useState<number | null>(
    null
  );
  const {
    localities,
    isLoading: isLoadingLocalities,
    selectedLocalityId,
    setSelectedLocalityId,
  } = useLocalities(selectedProvinceId ?? undefined);

  return (
    <motion.section
      className="flex flex-col items-center justify-center min-h-[40vh] w-full py-12 px-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="relative w-full max-w-3xl">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-card/50 rounded-2xl -z-10" />
        <div className="relative bg-background/70 backdrop-blur-sm border border-border/50 rounded-2xl p-8 shadow-lg overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16" />
          <div className="absolute bottom-0 left-0 w-40 h-40 bg-secondary/5 rounded-full -ml-20 -mb-20" />

          <div className="relative z-10">
            <motion.h2
              className="text-2xl font-display font-bold text-center text-foreground mb-6"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              Encuentra las mejores gasolineras
              <span className="block text-lg font-sans font-normal text-muted-foreground mt-2">
                Selecciona tu ubicación
              </span>
            </motion.h2>
            <div className="flex flex-col md:flex-row gap-4 w-full items-center justify-center mt-8">
              <AnimatePresence mode="wait">
                {isLoadingProvinces ? (
                  <motion.div
                    className="w-full md:w-64"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    key="loading"
                  >
                    <Skeleton className="h-12 w-full rounded-lg" />
                  </motion.div>
                ) : (
                  <motion.div
                    className="w-full md:w-64"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                    key="province-selector"
                  >
                    <SelectComponent
                      items={mapProvincesToSelectItems(provinces)}
                      label="Provincia"
                      className="w-full"
                      value={
                        selectedProvinceId ? String(selectedProvinceId) : ""
                      }
                      size="md"
                      onSelectionChange={(provinceId) => {
                        setSelectedProvinceId(provinceId ? Number(provinceId) : null);
                        setSelectedLocalityId(null);
                      }}
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              <motion.div
                className="w-full md:w-64"
                initial={{ opacity: 0, x: 10 }}
                animate={{
                  opacity: selectedProvinceId ? 1 : 0.5,
                  x: 0,
                  transition: { delay: 0.4 },
                }}
              >
                <SelectComponent
                  items={mapLocalitiesToSelectItems(localities)}
                  label="Municipio"
                  className="w-full"
                  value={selectedLocalityId ? String(selectedLocalityId) : ""}
                  size="md"
                  isDisabled={!selectedProvinceId || isLoadingLocalities}
                  isLoading={isLoadingLocalities}
                  onSelectionChange={(localityId) =>
                    setSelectedLocalityId(localityId)
                  }
                />
              </motion.div>
            </div>

            {selectedLocalityId && (
              <motion.div
                className="mt-6 text-center"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <p className="text-muted-foreground text-sm font-sans-serif">
                  Mostrando resultados para la región seleccionada
                </p>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </motion.section>
  );
}
