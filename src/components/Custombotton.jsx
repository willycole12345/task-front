import React from 'react';

const customButton = ({ title, containerStyles, btnType, handleClick, textStyles, rightIcon, id }) => {
  return (
    <button disabled={false} type={btnType || "button"} className={`custom-btn ${containerStyles}`} onClick={handleClick}>
      <span className={`flex-1 ${textStyles}`}> {title}</span>
      {rightIcon && (
        <div className="relative w-6 h-6">
          <Image src={rightIcon} alt="right Icon" fill className="object-contain" />
        </div>
      )}
    </button>
  )
}

export default customButton