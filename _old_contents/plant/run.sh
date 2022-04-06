#!/bin/bash

dirname=$1

chmod 755 $dirname
chmod 644 $dirname/*.JPG

mkdir -p $dirname/$dirname
rm -f $dirname/$dirname/*

for F in `ls -F $dirname | grep -v /`; do
    f=`echo $F | tr A-Z a-z`
    mv $dirname/$F $dirname/$f
    
    b=`basename $f .jpg`

    convert -quality 50 "$dirname/$f" "$dirname/$dirname/$b.jpg"
    convert -resize 600x -quality 50 "$dirname/$f" "$dirname/$dirname/$b.thumb.jpg"
done

