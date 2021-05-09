export const we = 'we';
//
// import React, {Component} from 'react';
// import SegmentViewWrapper, {SegmentProps} from "../SegmentViewWrapper";
// import {NodeStorage} from "../../NodeStorage";
// import "./OptionSegment.css"
// import {mainColors} from "../../../../App";
// import {NodeCanvasViewProperties} from "../../NodeCanvasViewProperties";
// import {PortType, SegmentModel} from "../../../../logic/node-editor/segment/SegmentModel";
//
// export class OptionSegmentProps extends SegmentProps<string> {
//     public options: string[];
//
//     constructor(segment: SegmentModel<string>, storage: NodeStorage, currentScale: NodeCanvasViewProperties, options: string[]) {
//         super(segment, storage, currentScale);
//         this.options = options;
//     }
// }
//
// export class OptionSegment extends SegmentViewWrapper<string, OptionSegmentProps, { selectedOption: string, selected: boolean }> {
//
//     constructor(props: OptionSegmentProps) {
//         super(props);
//         this.state = {selectedOption: props.options[0], selected: false}
//     }
//
//     handleClick = () => {
//         if (this.state.selected) {
//             return;
//         }
//         let cancel: boolean = false;
//         this.setState({selected: true});
//         const cancelSelection = (event: any) => {
//             if (cancel) {
//                 this.setState({selected: false});
//                 window.removeEventListener("click", cancelSelection);
//                 cancel = false;
//             } else {
//                 cancel = true;
//             }
//         }
//         window.addEventListener("click", cancelSelection);
//     }
//
//     handleMouseEnter = () => {
//         document.body.style.cursor = "pointer";
//     }
//
//     handleMouseLeave = () => {
//         document.body.style.cursor = "auto";
//     }
//
//     handleChange = (value: string) => {
//         this.setState({selectedOption: value})
//         this.props.segment.value = value;
//     }
//
//     createSelectStyle() {
//         return {
//             position: "absolute",
//             top: this.topPosition,
//             marginTop: this.offsetTop,
//             marginLeft: this.offsetLeft,
//             width: this.width,
//             height: this.height,
//
//             display: "flex",
//             justifyContent: "center",
//             alignItems: "center",
//
//             backgroundColor: this.nodeStyle.segmentColor,
//             border: "1px solid " + this.nodeStyle.borderColor,
//             borderTopLeftRadius: this.height / 2,
//             borderTopRightRadius: this.height / 2,
//             borderBottomLeftRadius: this.state.selected ? 0 : this.height / 2,
//             borderBottomRightRadius: this.state.selected ? 0 : this.height / 2,
//             fontFamily: this.nodeStyle.fontFamily,
//             fontSize: this.segmentStyle.fontSizeToSegmentHeight * this.props.segment.parentDimensions.segmentHeight,
//             fontWeight: this.nodeStyle.labelsFontWeight,
//             color: this.nodeStyle.textColor,
//             userSelect: "none",
//             boxShadow: this.state.selected ? "0 0 2px 1px " + this.nodeStyle.borderColor : "none"
//         } as React.CSSProperties
//     }
//
//     render() {
//         let key = 0;
//         return (
//             <div onClick={this.handleClick} onMouseEnter={this.handleMouseEnter}
//                  onMouseLeave={this.handleMouseLeave} style={this.createSelectStyle()}>
//                 <span style={{position: "absolute", zIndex: this.state.selected ? 10000000 : "inherit"}}>
//                     {this.state.selectedOption}
//                 </span>
//                 <span style={{
//                     marginLeft: "85%",
//                     color: this.nodeStyle.headerColor,
//                     fontSize: this.segmentStyle.fontSizeToSegmentHeight * this.props.segment.parentDimensions.segmentHeight * 0.8
//                 }}>
//                     {this.state.selected ? "⮜" : "⮟"}
//                 </span>
//                 {this.state.selected ?
//                     <li className={"scroll"}
//                         onScroll={(event: any) => event.stopPropagation()}
//                         style={{
//                             position: "absolute", paddingTop: "5%", top: "95%", left: -1,
//                             maxHeight: "1000%",
//                             border: "1px solid " + this.nodeStyle.borderColor,
//                             borderTop: "none",
//                             boxSizing: "content-box",
//                             overflow: "auto",
//                             minWidth: this.width,
//                             listStyle: "none", zIndex: 10000,
//                             backgroundColor: "inherit",
//                             borderBottomLeftRadius: "10px",
//                             borderBottomRightRadius: "10px",
//                             boxShadow: "0 2px 2px 1px " + this.nodeStyle.borderColor
//                         }}>
//                         {this.props.options.filter(op => op !== this.state.selectedOption).map(
//                             op => (
//                                 <ListItem content={op} clickListener={this.handleChange} asLabel={false} key={key++}/>)
//                         )}
//
//                         <ListItem content={this.props.segment.label} clickListener={() => {
//                         }} asLabel={true}/>
//                     </li> :
//                     <div/>}
//
//
//             </div>
//         );
//     }
// }
//
// interface clickListener {
//     (value: string): void;
// }
//
// class ListItem extends Component<{ content: string, clickListener: clickListener, asLabel: boolean }, { hover: boolean }> {
//     constructor(props: any) {
//         super(props);
//         this.state = {hover: false};
//     }
//
//     handleMouseEnter = () => {
//         this.setState({hover: true});
//     }
//
//     handleMouseLeave = () => {
//         this.setState({hover: false});
//     }
//
//     render() {
//         return (
//             <ul onClick={() => this.props.clickListener(this.props.content)}
//                 onMouseEnter={this.handleMouseEnter}
//                 onMouseLeave={this.handleMouseLeave}
//                 style={{
//                     width: "100%", padding: 0, textAlign: "center",
//                     marginTop: this.props.asLabel ? "3px" : 0,
//                     marginBottom: this.props.asLabel ? "8px" : "3px",
//                     fontWeight: this.props.asLabel ? 400 : "inherit",
//                     color: this.state.hover && !this.props.asLabel ? mainColors.headerColor : mainColors.color
//                 }}>
//                 <div style={{
//                     width: this.props.asLabel ? "80%" : "70%",
//                     marginLeft: this.props.asLabel ? "10%" : "15%",
//                     padding: 0,
//                     marginBottom: "inherit",
//                     borderTop: (this.props.asLabel ? "2px " : "2px ") + (this.props.asLabel ? "solid " : "dotted ") + mainColors.headerColor
//                 }}/>
//                 {this.props.content}
//
//             </ul>
//         );
//     }
// }
//
// export class OptionSegmentModel extends SegmentModel<string> {
//     private readonly options: string[];
//
//     constructor(label: string, value: string, options: string[]) {
//         super(label, value, PortType.NO_PORT);
//         this.options = options;
//     }
//
//     createView(storage: NodeStorage, currentScale: NodeCanvasViewProperties): JSX.Element {
//         return <OptionSegment key={this._index} segment={this} storage={storage} currentScale={currentScale}
//                               options={this.options}/>;
//     }
// }
//
// export default OptionSegment;