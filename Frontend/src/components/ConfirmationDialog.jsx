// import React from "react";
// const ConfirmationDialog = ({
//   isOpen,
//   onClose,
//   onConfirm,
//   title,
//   confirmText,
//   cancelText = "Cancel",
//   confirmColor = "#FF6584",
//   cancelColor = "#FF6584",
//   theme = "bg-base-100 text-base-content"
// }) => {
//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center">
//       {/* Semi-transparent background (still lets CustomerList show through) */}
//       <div
//         className="absolute inset-0 bg-opacity-30 backdrop-blur-xs"
//         onClick={onClose}
//       />

//       {/* Dialog box */}
//       <div className="relative z-50 bg-white min-w-[70%] md:min-w-[25vw] min-h-[23vh] rounded-xl shadow-lg p-6 border border-gray-200 flex flex-col gap-8">
//         <h1 className="font-[600] text-lg mt-4 text-center">{title}</h1>
//         <div className="flex justify-around gap-14 my-5   items-center mx-6">
//           <button
//             style={{
//               color: cancelColor,
//               borderColor: cancelColor
//             }}
//             className="cursor-pointer bg-white border-2 px-16 py-2 rounded-md font-[500] text-sm hover:bg-gray-50 transition-colors"
//             onClick={onClose}
//           >
//             {cancelText}
//           </button>
//           <button
//             style={{ backgroundColor: confirmColor }}
//             className="cursor-pointer text-white px-16 py-2 rounded-md font-[500] text-sm hover:bg-opacity-90 transition-colors"
//             onClick={onConfirm}
//           >
//             {confirmText}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ConfirmationDialog;

import React from "react";

const ConfirmationDialog = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  confirmText,
  cancelText = "Cancel",
  confirmColor = "#FF6584",
  cancelColor = "#FF6584",
  theme = "bg-base-100 text-base-content" // Default theme classes
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Semi-transparent backdrop */}
      <div
        className="absolute inset-0 bg-black bg-opacity-30 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Dialog box with dynamic theme applied */}
      <div
        className={`relative z-50 min-w-[70%] md:min-w-[25vw] min-h-[23vh] rounded-xl shadow-lg p-6 border flex flex-col gap-8 ${theme}`}
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
      >
        <h1 className="font-semibold text-lg mt-4 text-center">{title}</h1>

        <div className="flex justify-around gap-14 my-5 items-center mx-6">
          <button
            style={{
              color: cancelColor,
              borderColor: cancelColor
            }}
            className="cursor-pointer bg-white border-2 px-16 py-2 rounded-md font-medium text-sm hover:bg-gray-50 transition-colors"
            onClick={onClose}
          >
            {cancelText}
          </button>

          <button
            style={{ backgroundColor: confirmColor }}
            className="cursor-pointer text-white px-16 py-2 rounded-md font-medium text-sm hover:bg-opacity-90 transition-colors"
            onClick={onConfirm}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationDialog;
