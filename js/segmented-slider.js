(function($) {
    $.fn.segmentedSlider = function(options) {

        var sliderContainer = this.find('.slider-container');
        var handleWidth = options.handleWidth || 20;
        var handleSpace = handleWidth / 2;

        var segments = [];
        var segmentDivs = sliderContainer.find('div.segment');

        var colors = options.colors || ['red', 'green', 'orange', 'blue', 'yellow', 'purple'];

        (function init() {
            // rearrangePoints();
            setSegments();
            setHandleDraggable();

            // Set initial position of handles
            $.each(segments, function(index, segment){
                setPoint(segment);
            });
        }());

        function setSegments() {
            $.each(segmentDivs, function(index, div){
                // ADD HANDLES TO ALL SEGMENTS EXCEPT LAST
                if (index!=segmentDivs.length-1) $(div).append('<div class="handle"></div>');
                // CREATE SEGMENT OBJECT
                var segment = {
                    color: colors[index],
                    element: div,
                    handle: $(div).find('div.handle') || '',
                    change: 0
                };

                segment.point = parseInt(segment.element.dataset.initPoint) || 100 / segmentDivs.length;

                $(segment.element).css({
                    'background-color': segment.color,
                    height: options.height
                });
                $(segment.handle).css({
                    width: handleWidth,
                    height: options.height + 2
                });

                segments.push(segment);
            });
        }

        function setHandleDraggable() {
            // ADD DRAGGABLE OPTION TO ALL HANDLES
            $.each(segments, function(index, segment){
                if(segment.handle){
                    $(segment.handle).drag(function(ev, dd) {
                        var x = checkBoundary(dd.offsetX);
                        var tempPoint = convertPositionToPoint(x);
                        var startPosition = segment.point;
                        var segSetTotal = segment.point + segments[index+1].point;

                        segment.point = tempPoint <= 1 ? 1 : tempPoint>=segSetTotal-1 ? segSetTotal-1 : tempPoint;

                        console.log({ segment: segment.point, nextSeg: segments[index+1].point, total: segSetTotal, change: segment.change });

                        // segment.change = segment.point - startPosition;
                        segments[index+1].point = segSetTotal - segment.point;

                        setPoint(segment);
                    }, {
                        relative: true
                    }).drag( 'dragend', function(){
                        if (options.onDrop && typeof options.onDrop === "function") {
                            options.onDrop();
                        }
                    }); 
                }
            });
        }

        // Helpers
        function checkBoundary(x) {
            if (x + handleSpace <= handleSpace) {
                return 0;
            } else if (x + handleSpace > sliderContainer.width()) {
                return sliderContainer.width() - handleSpace;
            }

            return x;
        }

        function convertPointToPosition(point) {
            return ((point) / 100) * sliderContainer.width();
        }

        function convertPositionToPoint(position) {
            return position / sliderContainer.width() * 100;
        }

        function setPoint(segment) {
            var index = $(segments).index(segment);
            segment.position = convertPointToPosition(segment.point);
            // THIS SEG
            $(segment.element).css({
                width: segment.point + '%'
            });
            $(segment.handle).css({
                right: -(handleSpace)
            });

            if ( index!=segments.length-1 ) {
                // NEXT SEG
                $(segments[index+1].element).css({
                    left: convertPositionToPoint(segment.position + $(segment.element)[0].offsetLeft) + '%',
                    width: segments[index+1].point + '%'
                });
            }
        }
    }

}(jQuery));