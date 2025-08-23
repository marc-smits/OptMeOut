/*-------------------------------------------------------------------
|  Function ButtonMore
|
|  Purpose: Have a resuable ReadMore button, to use more than once on a page
|
|  Usage:
|     const [readMoreX, setReadMoreX] = useState(false);
|     const toggleReadMore1 = () => setReadMore1(prev => !prev);
|     return (<>
          <ButtonMore readMore={readMore1} toggleReadMore={toggleReadMore1} />
      </>)
|
|  Returns: OBJECT
*-------------------------------------------------------------------*/

function ButtonMore({ readMore, toggleReadMore }) {
  return (
    <div
      className={readMore ? 'button buttonMore less' : 'button buttonMore'}
      data-more='[[button.readmore.more]]'
      data-less='[[button.readmore.less]]'
      onClick={toggleReadMore}
    >
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M7.875 13.6969L7.875 -4.86836e-07L10.125 -3.7865e-07L10.125 13.6969L16.425 7.39688L18 9L9 18L-3.57639e-07 9L1.575 7.39688L7.875 13.6969Z"
          fill="currentColor"
        />
      </svg>
    </div>
  );
}

export default ButtonMore;
