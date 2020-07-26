import 'package:flutter/material.dart';
import 'package:bible/inherited.dart';
import 'package:bible/model.dart';

class WidgetVerse extends StatelessWidget {
  final VERSE verse;
  final String keyword;
  final String alsoInVerse;

  final Function(int) selection;
  // final ValueChanged<Map<String,dynamic>> onChange;

  WidgetVerse({Key key, this.verse,this.keyword, this.selection, this.alsoInVerse}) : super(key: key);

  @override
  Widget build(BuildContext context) {

    final userVerse = VerseInheritedWidget.of(context);

    return Column(
      mainAxisSize: MainAxisSize.max,
      crossAxisAlignment: CrossAxisAlignment.stretch,
      // mainAxisAlignment: MainAxisAlignment.center,
      children: <Widget>[
        if (verse.title.isNotEmpty) Container(
          padding: EdgeInsets.symmetric(vertical:20, horizontal:20),
          child: Text(
            verse.title.toUpperCase(),
            textAlign: TextAlign.center,
            style: TextStyle(
              color: Colors.black54,
              fontSize: userVerse.titleSize,
              fontWeight: FontWeight.w300,
              fontStyle: FontStyle.italic,
              height: 1.6
              // transform: TextTransform.capitalize,
            )
          ),
        ),
        Container(
          padding: EdgeInsets.symmetric(vertical:10, horizontal:10),
          margin: EdgeInsets.symmetric(horizontal:5,vertical:2),
          decoration: BoxDecoration(
            color: Theme.of(context).primaryColor,
            borderRadius: new BorderRadius.all(
              Radius.elliptical(3, 20)
              // Radius.elliptical(7, 100)
            ),
            boxShadow: [
              BoxShadow(
                blurRadius: 0.0,
                color: Theme.of(context).backgroundColor,
                spreadRadius: 0.6,
                offset: Offset(0.0, .0),
              )
            ]
          ),
          child: SelectableText.rich(
            TextSpan(
              children: <TextSpan>[
                TextSpan(
                  text: '\t',
                  children: <TextSpan>[
                    TextSpan(text: verse.name),
                  ],
                  style: TextStyle(
                    color: Colors.grey,
                    fontSize: userVerse.titleSize,
                    fontWeight: FontWeight.w300
                  )
                ),
                // TextSpan(text: '\t'),
                // TextSpan(text: verse.text),
                TextSpan(
                  text: '\t',
                  children: hightLight(
                    verse.text,
                    keyword,
                    TextStyle(
                      color: Colors.red,
                    )
                  ),
                  style: TextStyle(
                    color: userVerse.selected?Colors.black54:null,
                    shadows: <Shadow>[
                      Shadow(offset: Offset(userVerse.selected?0.3:0, 0),blurRadius: userVerse.selected?0.2:0.0,color: Colors.red)
                    ],
                    // decoration: userVerse.selected?TextDecoration.underline:TextDecoration.none,
                    // decorationColor: Colors.red,
                    // decorationThickness: 0.5,
                    // decorationStyle: TextDecorationStyle.wavy
                  )
                ),
                if (alsoInVerse != null && alsoInVerse.isNotEmpty) TextSpan(
                  text:'\t ...'+alsoInVerse,
                  style: TextStyle(
                    color: Colors.grey,
                    fontSize: userVerse.titleSize,
                    fontWeight: FontWeight.w300
                  )
                  // textAlign: TextAlign.right,
                ),
              ]
            ),
            style: TextStyle(
              color: Colors.black,
              fontWeight:FontWeight.w400,
              fontSize: userVerse.fontSize,
              height: userVerse.fontHeight
            ),
            // onTap: null,
            onTap: (){
              if (selection is Function) selection(verse.id);
            }
          )
        ),

      ],
    );
  }

  List<TextSpan> hightLight(String text, String matchWord, TextStyle style) {
    // final style = TextStyle(color: Colors.red, fontSize: 22);
    // children: hightLight(verse['text'], store.searchQuery, style),
    List<TextSpan> spans = [];
    if (matchWord == null || matchWord.length < 3){
      spans.add(TextSpan(text: text));
    } else {
      int spanBoundary = 0;
      do {
        // look for the next match
        final startIndex = text.toLowerCase().indexOf(matchWord.toLowerCase(), spanBoundary);
        // final startIndex = text.toLowerCase().indexOf(matchWord, spanBoundary);
        // if no more matches then add the rest of the string without style
        if (startIndex == -1) {
          spans.add(TextSpan(text: text.substring(spanBoundary)));
          return spans;
        }
        // add any unstyled text before the next match
        if (startIndex > spanBoundary) {
          spans.add(TextSpan(text: text.substring(spanBoundary, startIndex)));
        }
        // style the matched text
        final endIndex = startIndex + matchWord.length;
        final spanText = text.substring(startIndex, endIndex);
        spans.add(TextSpan(text: spanText, style: style));
        // mark the boundary to start the next search from
        spanBoundary = endIndex;
      // continue until there are no more matches
      } while (spanBoundary < text.length);
    }
    return spans;
  }
}