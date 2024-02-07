import { editAddress } from "@/actions/user";
import Modal from "@/components/shared/Modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { upperFirst } from "@/helpers";
import { dev } from "@/helpers/initial";
import useMugi from "@/hooks/useMugi";
import { User } from "@prisma/client";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowBigLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { CiEdit } from "react-icons/ci";
import { FaPlus } from "react-icons/fa";
import { toast } from "sonner";

const CartAddress = ({ user: self }: { user: User }) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [address, setAddress] = useState("");
  const { step, setStep } = useMugi();

  const handleSubmit = () => {
    startTransition(() =>
      editAddress(address)
        .then(() => {
          toast.success("Address added successfully");
          setAddress("");
          router.push("/cart");
        })
        .catch(() => {
          toast.error(dev);
        })
    );
  };

  const btn = (
    <Button onClick={handleSubmit} disabled={address == "" || isPending}>
      Save
    </Button>
  );

  const input = (
    <Input
      value={address}
      onChange={(e) => setAddress(e.target.value)}
      placeholder="Address..."
      required
    />
  );

  useEffect(() => {
    setAddress(self.address!);
  }, [self.address]);

  return (
    <>
      <AnimatePresence initial={false}>
        {step && (
          <motion.div
            className="flex flex-col gap-2 "
            whileInView={{ opacity: 1 }}
            transition={{ ease: "easeInOut", duration: 0.3 }}
            initial={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            layout
          >
            <div className="fl-center justify-between">
              <h3 className="text-lg">Shipping Address</h3>
              <Button
                variant="link"
                className="hoveredText"
                onClick={() => setStep(0)}
              >
                Back
              </Button>
            </div>

            <div className=" space-y-2">
              <p className=" font-semibold">
                {upperFirst(self.username)}&apos;s Home
              </p>
              {self.address ? (
                <>
                  <div className="fl-center gap-2">
                    <p className=" focusedWord">{self.address}</p>
                    <Modal
                      label="Address"
                      icon={<CiEdit />}
                      cancel="Cancel"
                      action="Action"
                      button={btn}
                    >
                      {input}
                    </Modal>
                  </div>
                </>
              ) : (
                <Modal
                  icon={<FaPlus />}
                  label="Address"
                  cancel="Cancel"
                  action="Action"
                  button={btn}
                >
                  {input}
                </Modal>
              )}
            </div>
            <Separator className=" mb-4" />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default CartAddress;
