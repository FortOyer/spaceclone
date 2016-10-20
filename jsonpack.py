#!/usr/bin/python

import sys
import os

def jsonPack(inputFolder, outputFile):
    """
    " Merges json files into one long array in a ts file so they play nice with
    " browserify and typescript packing.
    " @param inputFolder folder containing all json scripts to merge
    " @param outputFile final exported output file.
    """

    outDir = os.path.dirname(outputFile)
    if not os.path.exists(outDir):
        os.makedirs(outDir)

    with open(outputFile, 'w') as out:
        out.write("export const rooms = [")
        for filename in os.listdir(inputFolder):
            with open(os.path.join(inputFolder, filename), 'r') as jsonFile:
                for line in jsonFile:
                    out.write(line)
            out.write(",")
        out.seek(-1, 2)
        out.write("]")

if __name__ == "__main__":
    jsonPack(sys.argv[1], sys.argv[2])