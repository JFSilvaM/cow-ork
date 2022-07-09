import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import Button from "./Button";
import Typography from "./Typography";

export default function Modal({ children, isOpen, setIsOpen, onClick }) {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="relative z-50"
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        </Transition.Child>

        <div className="fixed inset-0 flex items-center justify-center p-4">
          <div className="flex min-h-full w-full items-center justify-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-screen-sm rounded bg-white p-4 dark:bg-slate-800">
                <Dialog.Title>
                  <Typography className="uppercase" weight="bold">
                    Acción no reversible
                  </Typography>
                </Dialog.Title>

                <Dialog.Description className="my-6 text-slate-800 dark:text-slate-200">
                  {children}
                </Dialog.Description>

                <div className="space-x-2">
                  <Button
                    color="error"
                    variant="outlined"
                    size="sm"
                    shape="rounded"
                    onClick={onClick}
                  >
                    Borrar
                  </Button>

                  <Button
                    variant="link"
                    color="secondary"
                    size="sm"
                    shape="rounded"
                    onClick={() => setIsOpen(false)}
                  >
                    Cancelar
                  </Button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
