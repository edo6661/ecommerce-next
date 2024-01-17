import { Button } from "@/components/ui/button";
import useMugi from "@/hooks/useMugi";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

const Actions = () => {
  const {
    categoryModal,
    falseCategoryModal,
    trueCategoryModal,
    trueBrandModal,
    falseBrandModal,
    brandModal,
  } = useMugi((state) => state);

  const pathname = usePathname();

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (!(e.target as HTMLElement).closest(".keepModalOpen"))
        categoryModal && falseCategoryModal();
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [categoryModal, falseCategoryModal]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (!(e.target as HTMLElement).closest(".keepModalOpen"))
        brandModal && falseBrandModal();
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [brandModal, falseBrandModal]);

  useEffect(() => {
    falseCategoryModal();
    falseBrandModal();
  }, [pathname, falseCategoryModal, falseBrandModal]);

  return (
    <>
      <div className="grid grid-cols-2">
        <Button
          type="button"
          className="rounded-none"
          variant="ghost"
          onClick={(e) => {
            trueCategoryModal();
            e.stopPropagation();
          }}
        >
          Add New Category
        </Button>
        <Button
          type="button"
          className="rounded-none"
          variant="ghost"
          onClick={(e) => {
            trueBrandModal();
            e.stopPropagation();
          }}
        >
          Add New Brand
        </Button>
      </div>
    </>
  );
};

export default Actions;
