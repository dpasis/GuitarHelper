# GuitarHelper
A p5.js web application to visualize the chords of the acoustic guitar.

View the sketch.js file on how to display the chord of the guitar.


Setting the guitar to display the chord is simple:

On p5 setup() function:
<pre>
let guitar = new Guitar(width, height);
</pre>

On p5 draw() function:
<pre>
guitar.setChord('A valid guitar Chord');
</pre>

If the chord is not found, all the strings turns red. If you want to add more chord, edit the guitar.js and modify the getChord() function's switch statement.

<pre>
return {
  'e': { 'v': 0 },
  'B': { 'v': 2, 'idx': 4 },
  'G': { 'v': 2, 'idx': 2 },
  'D': { 'v': 2, 'idx': 3 },
  'A': { 'v': 0 },
  'E': { 'v': null }
};
</pre>

The key of the above object denotes the position of the string in the guitar as follows:
<pre>
"e" is the 1st string
"B" is the second string
"G" is the third string
"D" is the 4th string
"A" is the 5th string 
and "E" is the 6th string.
</pre>
The "v" key is the fret number and "idx" key is the finger number on that fret as follows:
<pre>
null is mute
0 is open string
pinky finger is 4
ring finger is 3
middle finger is 2
and pointing finger is 1
</pre>

You can also display a tab on the guitar though only 1 tab at a time can be rendered. You can modify the <code>guitar.js</code> to accept an array of tab to render multiple tab at a time.

To set the tab to render:
<pre>
 //String_Index is the key of the stringIndex
 guitar.setTab( Tab_Number, String_Index );
</pre>

@TODO: Make the guitar render multiple tab point at a time.

Demo:
[Guitar Helper Demo](https://editor.p5js.org/full/Hy5YY-Cu7)
